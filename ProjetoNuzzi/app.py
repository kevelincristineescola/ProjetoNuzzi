# -*- coding: utf-8 -*-
"""
===============================================================
 FEIRA NUZZI — BACK-END FLASK + SQLITE
===============================================================
 Este único arquivo:
   • Serve o front (index.html, style.css, script.js) da mesma pasta
   • Expõe uma API REST /api/... que substitui o localStorage
   • Persiste tudo em SQLite (feira.db é criado automaticamente)

 Rodar:
     pip install flask flask-cors
     python app.py

 Acessar:
     http://localhost:5000

 Contas criadas automaticamente no primeiro start:
     cliente@feiranuzzi.com  / compras123   (cliente)
     nino@feiranuzzi.com     / colheita2024 (vendedor)
     admin@feiranuzzi.com    / admin123     (adm)
===============================================================
"""
import os
import sqlite3
from datetime import datetime
from functools import wraps
from pathlib import Path

from flask import (
    Flask, request, jsonify, g, session,
    send_from_directory, abort,
)
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


# ---------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------
BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "feira.db"

app = Flask(__name__, static_folder=None)
app.secret_key = os.environ.get("FEIRA_SECRET", "troque-esta-chave-em-producao")
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)
CORS(app, supports_credentials=True)


# ---------------------------------------------------------------
# SCHEMA — espelha exatamente o formato que o front já usa
# ---------------------------------------------------------------
SCHEMA = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    senha_hash  TEXT NOT NULL,
    tipo        TEXT NOT NULL CHECK (tipo IN ('cliente','vendedor','adm')),
    criado_em   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lojas (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id   INTEGER UNIQUE NOT NULL,
    nome         TEXT NOT NULL DEFAULT '',
    categoria    TEXT NOT NULL DEFAULT '',
    descricao    TEXT NOT NULL DEFAULT '',
    tempo        TEXT NOT NULL DEFAULT '',
    horario      TEXT NOT NULL DEFAULT '',
    logo         TEXT NOT NULL DEFAULT '',
    banner       TEXT NOT NULL DEFAULT '',
    aberta       INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produtos (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    loja_id      INTEGER NOT NULL,
    nome         TEXT NOT NULL,
    descricao    TEXT NOT NULL DEFAULT '',
    preco        TEXT NOT NULL DEFAULT 'R$ 0,00',   -- formato do front
    categoria    TEXT NOT NULL DEFAULT '',
    imagem       TEXT NOT NULL DEFAULT '',
    disponivel   INTEGER NOT NULL DEFAULT 1,
    estoque      INTEGER,                            -- NULL = sem controle
    criado_em    TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (loja_id) REFERENCES lojas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pedidos (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    loja_id         INTEGER NOT NULL,
    cliente_id      INTEGER,
    cliente_nome    TEXT NOT NULL,
    reserva_id      TEXT,
    itens           TEXT NOT NULL,                   -- "2x Manga, 1x Alface"
    valor           TEXT NOT NULL,                   -- "R$ 13,80"
    valor_numerico  REAL NOT NULL DEFAULT 0,
    hora            TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'pendente'
                    CHECK (status IN ('pendente','preparo','pronto','concluido','cancelado')),
    criado_em       TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (loja_id)    REFERENCES lojas(id)   ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS visitas (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    stall_id     INTEGER NOT NULL,
    visitado_em  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prod_loja   ON produtos(loja_id);
CREATE INDEX IF NOT EXISTS idx_ped_loja    ON pedidos(loja_id);
CREATE INDEX IF NOT EXISTS idx_ped_cliente ON pedidos(cliente_id);
"""


# ---------------------------------------------------------------
# BANCO
# ---------------------------------------------------------------
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    with get_conn() as conn:
        conn.executescript(SCHEMA)
        conn.commit()


def seed_demo():
    with get_conn() as conn:
        demo = [
            ("Cliente Demo", "cliente@feiranuzzi.com", "compras123",   "cliente"),
            ("Seu Nino",     "nino@feiranuzzi.com",    "colheita2024", "vendedor"),
        ]
        for nome, email, senha, tipo in demo:
            if not conn.execute("SELECT 1 FROM usuarios WHERE email=?", (email,)).fetchone():
                conn.execute(
                    "INSERT INTO usuarios (nome,email,senha_hash,tipo) VALUES (?,?,?,?)",
                    (nome, email, generate_password_hash(senha), tipo),
                )
        if not conn.execute("SELECT 1 FROM usuarios WHERE tipo='adm'").fetchone():
            conn.execute(
                "INSERT INTO usuarios (nome,email,senha_hash,tipo) VALUES (?,?,?,?)",
                ("Administrador", "admin@feiranuzzi.com",
                 generate_password_hash("admin123"), "adm"),
            )
        conn.commit()
        print(">> Contas de demonstração garantidas.")


# ---------------------------------------------------------------
# HELPERS / AUTH
# ---------------------------------------------------------------
def rows_to_list(rows):
    return [dict(r) for r in rows]


def autenticar(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        uid = session.get("uid")
        if not uid:
            return jsonify({"erro": "Não autenticado"}), 401
        with get_conn() as conn:
            u = conn.execute("SELECT * FROM usuarios WHERE id=?", (uid,)).fetchone()
        if not u:
            session.clear()
            return jsonify({"erro": "Sessão inválida"}), 401
        g.usuario = dict(u)
        return f(*args, **kwargs)
    return wrapper


def exigir_tipo(*tipos):
    def deco(f):
        @wraps(f)
        @autenticar
        def wrapper(*args, **kwargs):
            if g.usuario["tipo"] not in tipos:
                return jsonify({"erro": "Acesso negado"}), 403
            return f(*args, **kwargs)
        return wrapper
    return deco


# ---------------------------------------------------------------
# AUTENTICAÇÃO
# ---------------------------------------------------------------
@app.post("/api/auth/register")
def register():
    data = request.get_json() or {}
    nome  = (data.get("nome") or "").strip()
    email = (data.get("email") or "").strip().lower()
    senha = data.get("senha") or ""
    if not nome or not email or len(senha) < 6:
        return jsonify({"erro": "Dados inválidos (senha mín. 6 caracteres)"}), 400

    with get_conn() as conn:
        if conn.execute("SELECT 1 FROM usuarios WHERE email=?", (email,)).fetchone():
            return jsonify({"erro": "E-mail já cadastrado"}), 409
        cur = conn.execute(
            "INSERT INTO usuarios (nome,email,senha_hash,tipo) VALUES (?,?,?,?)",
            (nome, email, generate_password_hash(senha), "cliente"),
        )
        conn.commit()
        uid = cur.lastrowid

    session["uid"] = uid
    return jsonify({"email": email, "type": "cliente", "name": nome}), 201


@app.post("/api/auth/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    senha = data.get("senha") or ""

    with get_conn() as conn:
        u = conn.execute("SELECT * FROM usuarios WHERE email=?", (email,)).fetchone()

    if not u or not check_password_hash(u["senha_hash"], senha):
        return jsonify({"erro": "E-mail ou senha incorretos"}), 401

    session["uid"] = u["id"]
    return jsonify({"email": u["email"], "type": u["tipo"], "name": u["nome"]})


@app.post("/api/auth/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.get("/api/auth/session")
def get_session():
    """Retorna { email, type, name } ou null."""
    uid = session.get("uid")
    if not uid:
        return jsonify(None)
    with get_conn() as conn:
        u = conn.execute("SELECT * FROM usuarios WHERE id=?", (uid,)).fetchone()
    if not u:
        session.clear()
        return jsonify(None)
    return jsonify({"email": u["email"], "type": u["tipo"], "name": u["nome"]})


# ---------------------------------------------------------------
# VISITAS (tracking de cliques em barracas)
# ---------------------------------------------------------------
@app.post("/api/visits")
def registrar_visita():
    data = request.get_json() or {}
    stall_id = data.get("stallId")
    if not stall_id:
        return jsonify({"erro": "stallId obrigatório"}), 400
    with get_conn() as conn:
        conn.execute("INSERT INTO visitas (stall_id) VALUES (?)", (int(stall_id),))
        conn.commit()
    return jsonify({"ok": True})


# ---------------------------------------------------------------
# CATÁLOGO PÚBLICO — barracas dos vendedores
# ---------------------------------------------------------------
FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"


def _hash_stall_id(email: str) -> int:
    """Reproduz hashStallId() do front-end, para os ids baterem."""
    h = 0
    for c in email:
        h = (h * 31 + ord(c)) & 0xFFFFFFFF
        if h >= 0x80000000:
            h -= 0x100000000
    return 900000000 + abs(h)


@app.get("/api/stalls")
def listar_stalls():
    """
    Retorna as barracas de vendedores (lojas abertas com pelo menos
    1 produto disponível), no mesmo formato da função buildVendorStall()
    do front-end.
    """
    with get_conn() as conn:
        rows = conn.execute("""
            SELECT u.email, u.nome AS owner_nome, l.*
            FROM usuarios u
            JOIN lojas l ON l.usuario_id = u.id
            WHERE u.tipo='vendedor' AND l.aberta=1
              AND EXISTS (SELECT 1 FROM produtos p
                          WHERE p.loja_id=l.id AND p.disponivel=1)
            ORDER BY l.nome
        """).fetchall()

        result = []
        for r in rows:
            prods = conn.execute("""
                SELECT * FROM produtos
                WHERE loja_id=? AND disponivel=1
                ORDER BY criado_em DESC
            """, (r["id"],)).fetchall()

            cover = r["banner"] or r["logo"] or FALLBACK_IMG
            result.append({
                "id": _hash_stall_id(r["email"]),
                "_vendorEmail": r["email"],
                "name": r["nome"] or r["owner_nome"] or "Barraca",
                "category": r["categoria"] or "Outros",
                "owner": r["owner_nome"] or "",
                "desc": r["descricao"] or "Loja parceira da feira.",
                "about": r["descricao"] or "Loja parceira da feira.",
                "cover": cover,
                "gallery": [cover, r["logo"] or FALLBACK_IMG, FALLBACK_IMG],
                "address": "Vitrine da loja na Feira Nuzzi",
                "hours": r["horario"] or "Consulte o horário na loja",
                "products": [{
                    "name": p["nome"],
                    "price": p["preco"],
                    "desc": p["descricao"] or "",
                    "img": p["imagem"] or FALLBACK_IMG,
                    "estoque": p["estoque"],
                } for p in prods],
            })
    return jsonify(result)


# ---------------------------------------------------------------
# VENDEDOR — dados da loja / produtos / pedidos
# ---------------------------------------------------------------
def _vendor_payload(conn, usuario_id: int) -> dict:
    """Monta o mesmo objeto que o front salva em feira_vendor_<email>."""
    loja = conn.execute("SELECT * FROM lojas WHERE usuario_id=?", (usuario_id,)).fetchone()
    if not loja:
        return {
            "loja": {"nome": "", "categoria": "", "descricao": "",
                     "tempo": "", "horario": "", "logo": "", "banner": "",
                     "aberta": False},
            "produtos": [], "pedidos": [],
        }

    produtos = conn.execute(
        "SELECT * FROM produtos WHERE loja_id=? ORDER BY criado_em DESC",
        (loja["id"],)
    ).fetchall()
    pedidos = conn.execute(
        "SELECT * FROM pedidos WHERE loja_id=? ORDER BY criado_em DESC",
        (loja["id"],)
    ).fetchall()

    return {
        "loja": {
            "nome": loja["nome"], "categoria": loja["categoria"],
            "descricao": loja["descricao"], "tempo": loja["tempo"],
            "horario": loja["horario"], "logo": loja["logo"],
            "banner": loja["banner"], "aberta": bool(loja["aberta"]),
        },
        "produtos": [{
            "id": p["id"], "nome": p["nome"], "descricao": p["descricao"],
            "preco": p["preco"], "categoria": p["categoria"],
            "imagem": p["imagem"], "disponivel": bool(p["disponivel"]),
            "estoque": p["estoque"],
        } for p in produtos],
        "pedidos": [{
            "id": p["id"], "cliente": p["cliente_nome"], "itens": p["itens"],
            "valor": p["valor"], "valorNumerico": p["valor_numerico"],
            "hora": p["hora"], "status": p["status"], "reservaId": p["reserva_id"],
        } for p in pedidos],
    }


@app.get("/api/vendor/data")
@exigir_tipo("vendedor")
def vendor_data():
    with get_conn() as conn:
        return jsonify(_vendor_payload(conn, g.usuario["id"]))


@app.put("/api/vendor/loja")
@exigir_tipo("vendedor")
def vendor_update_loja():
    data = request.get_json() or {}
    campos = ("nome", "categoria", "descricao", "tempo", "horario", "logo", "banner")
    with get_conn() as conn:
        loja = conn.execute("SELECT * FROM lojas WHERE usuario_id=?",
                            (g.usuario["id"],)).fetchone()
        if not loja:
            conn.execute("""
                INSERT INTO lojas (usuario_id, nome, categoria, descricao,
                                   tempo, horario, logo, banner, aberta)
                VALUES (?,?,?,?,?,?,?,?,?)
            """, (
                g.usuario["id"],
                data.get("nome", ""), data.get("categoria", ""),
                data.get("descricao", ""), data.get("tempo", ""),
                data.get("horario", ""), data.get("logo", ""),
                data.get("banner", ""),
                1 if data.get("aberta") else 0,
            ))
        else:
            sets = ", ".join(f"{c}=?" for c in campos)
            vals = [data.get(c, loja[c]) for c in campos]
            if "aberta" in data:
                sets += ", aberta=?"
                vals.append(1 if data["aberta"] else 0)
            vals.append(g.usuario["id"])
            conn.execute(f"UPDATE lojas SET {sets} WHERE usuario_id=?", vals)
        conn.commit()
    return jsonify({"ok": True})


@app.post("/api/vendor/produtos")
@exigir_tipo("vendedor")
def vendor_criar_produto():
    data = request.get_json() or {}
    nome = (data.get("nome") or "").strip()
    if not nome:
        return jsonify({"erro": "Nome obrigatório"}), 400

    with get_conn() as conn:
        loja = conn.execute("SELECT id FROM lojas WHERE usuario_id=?",
                            (g.usuario["id"],)).fetchone()
        if not loja:
            cur = conn.execute(
                "INSERT INTO lojas (usuario_id, nome) VALUES (?,?)",
                (g.usuario["id"], g.usuario["nome"])
            )
            loja_id = cur.lastrowid
        else:
            loja_id = loja["id"]

        cur = conn.execute("""
            INSERT INTO produtos (loja_id, nome, descricao, preco, categoria,
                                  imagem, disponivel, estoque)
            VALUES (?,?,?,?,?,?,?,?)
        """, (
            loja_id, nome,
            data.get("descricao", ""),
            data.get("preco", "R$ 0,00"),
            data.get("categoria", ""),
            data.get("imagem", ""),
            1 if data.get("disponivel", True) else 0,
            data.get("estoque"),
        ))
        conn.commit()
        new_id = cur.lastrowid
    return jsonify({"id": new_id, "ok": True}), 201


@app.put("/api/vendor/produtos/<int:pid>")
@exigir_tipo("vendedor")
def vendor_editar_produto(pid):
    data = request.get_json() or {}
    campos = ("nome", "descricao", "preco", "categoria",
              "imagem", "disponivel", "estoque")

    with get_conn() as conn:
        p = conn.execute("""
            SELECT p.id FROM produtos p
            JOIN lojas l ON l.id = p.loja_id
            WHERE p.id=? AND l.usuario_id=?
        """, (pid, g.usuario["id"])).fetchone()
        if not p:
            return jsonify({"erro": "Produto não encontrado"}), 404

        sets, vals = [], []
        for c in campos:
            if c in data:
                sets.append(f"{c}=?")
                if c == "disponivel":
                    vals.append(1 if data[c] else 0)
                else:
                    vals.append(data[c])
        if sets:
            vals.append(pid)
            conn.execute(f"UPDATE produtos SET {', '.join(sets)} WHERE id=?", vals)
            conn.commit()
    return jsonify({"ok": True})


@app.delete("/api/vendor/produtos/<int:pid>")
@exigir_tipo("vendedor")
def vendor_excluir_produto(pid):
    with get_conn() as conn:
        cur = conn.execute("""
            DELETE FROM produtos WHERE id=? AND loja_id IN
                (SELECT id FROM lojas WHERE usuario_id=?)
        """, (pid, g.usuario["id"]))
        conn.commit()
    if cur.rowcount == 0:
        return jsonify({"erro": "Produto não encontrado"}), 404
    return jsonify({"ok": True})


@app.put("/api/vendor/pedidos/<int:pid>/status")
@exigir_tipo("vendedor")
def vendor_update_pedido(pid):
    data = request.get_json() or {}
    status = data.get("status")
    if status not in ("pendente", "preparo", "pronto", "concluido", "cancelado"):
        return jsonify({"erro": "Status inválido"}), 400
    with get_conn() as conn:
        cur = conn.execute("""
            UPDATE pedidos SET status=? WHERE id=? AND loja_id IN
                (SELECT id FROM lojas WHERE usuario_id=?)
        """, (status, pid, g.usuario["id"]))
        conn.commit()
    if cur.rowcount == 0:
        return jsonify({"erro": "Pedido não encontrado"}), 404
    return jsonify({"ok": True, "status": status})


# ---------------------------------------------------------------
# CLIENTE — cria pedidos (o "enviarPedidosParaVendedores" do front)
# ---------------------------------------------------------------
@app.post("/api/orders")
@exigir_tipo("cliente")
def criar_pedidos():
    """
    Body:
    {
      "reservaId": "#123456",
      "stalls": [
        {
          "vendorEmail": "nino@feiranuzzi.com",
          "items": [{"name":"Manga","price":"R$ 6,90/kg","qty":2}],
          "valor": "R$ 13,80",
          "valorNumerico": 13.80
        }
      ]
    }
    """
    data = request.get_json() or {}
    reserva_id = data.get("reservaId")
    stalls = data.get("stalls") or []
    if not stalls:
        return jsonify({"erro": "Sem itens"}), 400

    with get_conn() as conn:
        criados = []
        for s in stalls:
            email = (s.get("vendorEmail") or "").lower()
            if not email:
                continue
            vend = conn.execute(
                "SELECT id, nome FROM usuarios WHERE email=? AND tipo='vendedor'",
                (email,)
            ).fetchone()
            if not vend:
                continue
            loja = conn.execute("SELECT id FROM lojas WHERE usuario_id=?",
                                (vend["id"],)).fetchone()
            if not loja:
                continue

            itens_desc = ", ".join(
                f"{int(i['qty'])}x {i['name']}" for i in s.get("items", [])
            )
            cur = conn.execute("""
                INSERT INTO pedidos (loja_id, cliente_id, cliente_nome,
                                     reserva_id, itens, valor, valor_numerico,
                                     hora, status)
                VALUES (?,?,?,?,?,?,?,?, 'pendente')
            """, (
                loja["id"], g.usuario["id"], g.usuario["nome"],
                reserva_id, itens_desc,
                s.get("valor", "R$ 0,00"),
                float(s.get("valorNumerico") or 0),
                datetime.now().strftime("%H:%M"),
            ))
            criados.append(cur.lastrowid)
        conn.commit()
    return jsonify({"ok": True, "pedidos": criados}), 201


@app.get("/api/orders/minhas")
@exigir_tipo("cliente")
def minhas_reservas():
    """Reservas/pedidos do cliente logado (agrupados por reserva)."""
    with get_conn() as conn:
        rows = conn.execute("""
            SELECT p.*, l.nome AS loja_nome
            FROM pedidos p
            JOIN lojas l ON l.id = p.loja_id
            WHERE p.cliente_id = ?
            ORDER BY p.criado_em DESC
        """, (g.usuario["id"],)).fetchall()
    return jsonify(rows_to_list(rows))


# ---------------------------------------------------------------
# ADMIN
# ---------------------------------------------------------------
@app.get("/api/admin/usuarios")
@exigir_tipo("adm")
def admin_usuarios():
    with get_conn() as conn:
        us = conn.execute("""
            SELECT id, nome, email, tipo, criado_em FROM usuarios ORDER BY id
        """).fetchall()
    return jsonify(rows_to_list(us))


@app.post("/api/admin/usuarios")
@exigir_tipo("adm")
def admin_criar_usuario():
    data = request.get_json() or {}
    tipo = data.get("tipo")
    if tipo not in ("cliente", "vendedor", "adm"):
        return jsonify({"erro": "Tipo inválido"}), 400
    nome  = (data.get("nome") or "").strip()
    email = (data.get("email") or "").strip().lower()
    senha = data.get("senha") or ""
    if not nome or not email or len(senha) < 6:
        return jsonify({"erro": "Dados inválidos"}), 400

    with get_conn() as conn:
        if conn.execute("SELECT 1 FROM usuarios WHERE email=?", (email,)).fetchone():
            return jsonify({"erro": "E-mail já cadastrado"}), 409
        cur = conn.execute(
            "INSERT INTO usuarios (nome,email,senha_hash,tipo) VALUES (?,?,?,?)",
            (nome, email, generate_password_hash(senha), tipo),
        )
        uid = cur.lastrowid
        if tipo == "vendedor":
            conn.execute("INSERT INTO lojas (usuario_id, nome) VALUES (?,?)",
                         (uid, nome))
        conn.commit()
    return jsonify({"id": uid, "ok": True}), 201


@app.get("/api/admin/reservas")
@exigir_tipo("adm")
def admin_reservas():
    with get_conn() as conn:
        rows = conn.execute("""
            SELECT p.*, l.nome AS loja_nome
            FROM pedidos p JOIN lojas l ON l.id = p.loja_id
            ORDER BY p.criado_em DESC
        """).fetchall()
    return jsonify(rows_to_list(rows))


# ---------------------------------------------------------------
# ERROS
# ---------------------------------------------------------------
@app.errorhandler(404)
def nf(_):
    return jsonify({"erro": "Rota não encontrada"}), 404


@app.errorhandler(500)
def se(e):
    return jsonify({"erro": "Erro interno", "detalhe": str(e)}), 500


# ---------------------------------------------------------------
# ESTÁTICOS (o mesmo app.py serve o front)
# ---------------------------------------------------------------
ALLOWED_STATIC = {"index.html", "style.css", "script.js"}


@app.route("/")
def serve_index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def serve_static(filename):
    if filename in ALLOWED_STATIC:
        return send_from_directory(BASE_DIR, filename)
    abort(404)


# ---------------------------------------------------------------
# START
# ---------------------------------------------------------------
if __name__ == "__main__":
    init_db()
    seed_demo()
    print("=" * 60)
    print(" Feira Nuzzi  ->  http://localhost:5000")
    print(" Banco SQLite ->  " + str(DB_PATH))
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)