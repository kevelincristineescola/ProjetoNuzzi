


        /* ================== APP CLIENTE ================== */

        const STALLS = [
            /* Barracas de exemplo (dados fixos, só pra o catálogo não ficar vazio).
               Produtos aqui não têm o campo `estoque` preenchido — é opcional,
               tratado como "sem controle de estoque" quando ausente (igual a
               estoque:null). Ver produtosDisponiveis.map() mais abaixo, onde as
               barracas reais dos vendedores já entregam esse campo estruturado. */
            {
                id: 1,
                name: "Barraca do Seu Nino",
                category: "Frutas & Verduras",
                owner: "Antônio 'Nino' Ferreira",
                desc: "Produtos direto da roça, colhidos na véspera da feira.",
                about: "Há 22 anos na mesma esquina da feira, o Seu Nino traz frutas e verduras cultivadas em sua própria chácara na região metropolitana. A seleção muda com a estação — no verão, mangas e melancias; no inverno, couves e laranjas suculentas.",
                cover: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1000&q=80",
                    "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=600&q=80",
                    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80"
                ],
                address: "Rua das Palmeiras, esquina com Av. Central — Banca 12",
                hours: "Sáb e Dom, 6h às 13h",
                products: [
                    { name: "Manga Tommy", price: "R$ 6,90/kg", desc: "Doce e firme, colhida na semana.", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80" },
                    { name: "Alface crespa", price: "R$ 3,50 un", desc: "Orgânica, sem agrotóxico.", img: "https://images.unsplash.com/photo-1622206151226-18ca2c9d680f?w=400&q=80" },
                    { name: "Tomate italiano", price: "R$ 7,00/kg", desc: "Ideal para molhos caseiros.", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80" },
                    { name: "Laranja pêra", price: "R$ 4,20/kg", desc: "Suco na hora, sem conservantes.", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80" }
                ]
            },
            {
                id: 2,
                name: "Tear & Fio Artesanatos",
                category: "Artesanato",
                owner: "Marli e Joaquina",
                desc: "Peças de crochê, cerâmica e madeira feitas à mão.",
                about: "Duas irmãs que transformaram a tradição da avó em ofício. Cada peça é única — do crochê à cerâmica queimada em forno a lenha. Encomendas personalizadas são feitas sob consulta na própria barraca.",
                cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
                    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
                    "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80"
                ],
                address: "Alameda das Tipuanas, em frente ao coreto — Banca 27",
                hours: "Sáb e Dom, 8h às 17h",
                products: [
                    { name: "Manta em crochê", price: "R$ 120,00", desc: "Lã mista, 1,40m x 1,80m.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80" },
                    { name: "Vaso de cerâmica", price: "R$ 65,00", desc: "Queima artesanal, acabamento fosco.", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80" },
                    { name: "Porta-copos madeira", price: "R$ 38,00 (jogo)", desc: "Madeira de reflorestamento.", img: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&q=80" }
                ]
            },
            {
                id: 3,
                name: "Pastel da Dona Célia",
                category: "Comidas & Lanches",
                owner: "Célia Ramos",
                desc: "Pastéis fritos na hora, receita de família desde 1998.",
                about: "A fila mais famosa da feira. Dona Célia frita cada pastel na hora do pedido, com massa feita em casa toda madrugada de sábado. O caldo de cana geladinho é a dupla perfeita.",
                cover: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&q=80",
                    "https://images.unsplash.com/photo-1626804475297-411e58b23e35?w=600&q=80",
                    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80"
                ],
                address: "Rua das Palmeiras, próximo ao estacionamento — Banca 3",
                hours: "Sáb e Dom, 9h às 15h",
                products: [
                    { name: "Pastel de carne", price: "R$ 12,00", desc: "Recheio generoso, massa crocante.", img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80" },
                    { name: "Pastel de queijo", price: "R$ 11,00", desc: "Queijo derretido na medida certa.", img: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=400&q=80" },
                    { name: "Caldo de cana", price: "R$ 6,00", desc: "Extraído na hora, com limão.", img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80" }
                ]
            },
            {
                id: 4,
                name: "Flores do Vale",
                category: "Flores & Plantas",
                owner: "Rogério Andrade",
                desc: "Mudas, flores de corte e temperos frescos.",
                about: "Especializado em plantas ornamentais e temperos vivos — manjericão, alecrim e hortelã prontos para o vaso. Rogério também monta arranjos personalizados para eventos, com encomenda antecipada.",
                cover: "https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1000&q=80",
                    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
                    "https://images.unsplash.com/photo-1462530260150-162092dbf011?w=600&q=80"
                ],
                address: "Alameda das Tipuanas, canto sul — Banca 34",
                hours: "Sáb e Dom, 7h às 14h",
                products: [
                    { name: "Muda de manjericão", price: "R$ 9,00", desc: "Vaso de 10cm, pronto pra colher.", img: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&q=80" },
                    { name: "Buquê de girassóis", price: "R$ 35,00", desc: "7 hastes, embrulho em kraft.", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80" },
                    { name: "Suculenta mix", price: "R$ 14,00 un", desc: "Variedades sortidas, vaso de barro.", img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&q=80" }
                ]
            },
            {
                id: 5,
                name: "Queijos Serra Alta",
                category: "Laticínios",
                owner: "Família Bianchi",
                desc: "Queijos e embutidos de produção própria, direto da serra.",
                about: "A família Bianchi produz queijos artesanais há três gerações em uma pequena propriedade na serra. Tudo é feito em pequenos lotes, com leite da própria fazenda e maturação controlada.",
                cover: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1000&q=80",
                    "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&q=80",
                    "https://images.unsplash.com/photo-1573528839172-7f4dfbcbd88a?w=600&q=80"
                ],
                address: "Rua das Palmeiras, em frente à igreja — Banca 18",
                hours: "Sáb e Dom, 6h às 13h",
                products: [
                    { name: "Queijo colonial", price: "R$ 42,00/kg", desc: "Maturação de 20 dias, sabor suave.", img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80" },
                    { name: "Salame artesanal", price: "R$ 55,00/kg", desc: "Defumado em fumeiro próprio.", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80" },
                    { name: "Manteiga da roça", price: "R$ 18,00 (200g)", desc: "Batida fresca, sem conservantes.", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80" }
                ]
            },
            {
                id: 6,
                name: "Panificadora do Zé",
                category: "Padaria",
                owner: "José Martins",
                desc: "Pães, bolos e broas assados no forno a lenha.",
                about: "O forno a lenha do Zé fica ligado desde as 4h da manhã. O carro-chefe é o pão de fermentação natural, mas o cheiro da broa de fubá é o que atrai a fila logo cedo.",
                cover: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80",
                    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
                    "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80"
                ],
                address: "Av. Central, entrada principal da feira — Banca 1",
                hours: "Sáb e Dom, 6h às 12h",
                products: [
                    { name: "Pão fermentação natural", price: "R$ 22,00", desc: "Casca crocante, miolo alveolado.", img: "https://images.unsplash.com/photo-1585478259715-4d3a5f437075?w=400&q=80" },
                    { name: "Broa de fubá", price: "R$ 9,00", desc: "Receita de forno a lenha.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
                    { name: "Bolo de fubá cremoso", price: "R$ 28,00", desc: "Fatia generosa, cobertura de queijo.", img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80" }
                ]
            }
        ];

        /* ---------- movimento das barracas (tracking) ---------- */
        function getVisits() {
            return JSON.parse(localStorage.getItem('feira_visits') || '{}');
        }
        function registerVisit(id) {
            const visits = getVisits();
            visits[id] = (visits[id] || 0) + 1;
            localStorage.setItem('feira_visits', JSON.stringify(visits));
        }

        const HIDDEN_CATS = ["Frutas & Verduras", "Artesanato", "Flores & Plantas", "Laticínios"];
        function getCategories() {
            return ["Todas", ...new Set(STALLS.map(s => s.category).filter(c => !HIDDEN_CATS.includes(c)))];
        }
        const filtersEl = document.getElementById('filters');
        const gridEl = document.getElementById('grid');
        const overlay = document.getElementById('overlay');
        const panel = document.getElementById('panel');
        const searchInput = document.getElementById('searchInput');
        let activeCat = "Todas";
        let searchTerm = "";

        function renderFilters() {
            const categories = getCategories();
            filtersEl.innerHTML = categories.map(c =>
                `<button data-cat="${c}" class="${c === activeCat ? 'active' : ''}">${c}</button>`
            ).join('');
            filtersEl.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeCat = btn.dataset.cat;
                    renderFilters();
                    renderGrid();
                });
            });
        }

        function renderGrid() {
            let list = activeCat === "Todas" ? STALLS : STALLS.filter(s => s.category === activeCat);
            const term = searchTerm.trim().toLowerCase();
            if (term) {
                list = list.filter(s =>
                    s.name.toLowerCase().includes(term) ||
                    s.category.toLowerCase().includes(term) ||
                    s.desc.toLowerCase().includes(term) ||
                    s.products.some(p => p.name.toLowerCase().includes(term))
                );
            }
            if (list.length === 0) {
                gridEl.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:40px 0; color:#6b5f4d;">Nenhuma barraca encontrada.</p>`;
                return;
            }
            gridEl.innerHTML = list.map(s => `
    <div class="stall-card" data-id="${s.id}">
      <span class="tag">${s.category}</span>
      <img src="${s.cover}" alt="${s.name}">
      <div class="body">
        <h3>${s.name}</h3>
        <div class="loc">📍 ${s.address.split('—')[0].trim()}</div>
        <div class="desc">${s.desc}</div>
        <div class="more">Saiba mais →</div>
      </div>
    </div>
  `).join('');
            gridEl.querySelectorAll('.stall-card').forEach(card => {
                card.addEventListener('click', () => openStall(Number(card.dataset.id)));
            });
        }

        function openStall(id) {
            const s = STALLS.find(x => x.id === id);
            registerVisit(id);
            panel.innerHTML = `
    <div class="panel-head">
      <button class="close" id="closeBtn">✕</button>
      <div class="gallery">
        <img src="${s.gallery[0]}" alt="${s.name}">
        <div class="side">
          <img src="${s.gallery[1]}" alt="${s.name} detalhe 1">
          <img src="${s.gallery[2]}" alt="${s.name} detalhe 2">
        </div>
      </div>
    </div>
    <div class="panel-body">
      <span class="tag">${s.category}</span>
      <h2>${s.name}</h2>
      <div class="owner">por ${s.owner}</div>
      <p class="about">${s.about}</p>

      <div class="loc-block">
        <div class="pin">📍</div>
        <div class="info">
          <b>${s.address}</b>
          <span>Localização dentro da feira</span>
          <div class="hours">🕒 ${s.hours}</div>
        </div>
      </div>

      <div class="section-label">Produtos</div>
      <div class="products">
        ${s.products.map((p, i) => `
          <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <div class="pbody">
              <h4>${p.name}</h4>
              <div class="price">${p.price}</div>
              <p>${p.desc}</p>
              <button class="product-add" data-stall="${s.id}" data-idx="${i}">+ Adicionar ao carrinho</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
            overlay.classList.add('open');
            document.getElementById('closeBtn').addEventListener('click', closeStall);
            panel.querySelectorAll('.product-add').forEach(btn => {
                btn.addEventListener('click', () => {
                    const stallId = Number(btn.getAttribute('data-stall'));
                    const idx = parseInt(btn.getAttribute('data-idx'), 10);
                    if (!requireLoginForCartAction({ type: "add-to-cart", stallId, idx })) return;
                    addToCart(stallId, idx);
                    btn.textContent = '✓ Adicionado';
                    btn.classList.add('added');
                    setTimeout(() => {
                        btn.textContent = '+ Adicionar ao carrinho';
                        btn.classList.remove('added');
                    }, 1200);
                });
            });
            document.body.style.overflow = 'hidden';
        }

        function closeStall() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeStall(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeStall();
                closeCart();
                closeConfirm();
                closeTicket();
            }
        });

        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderGrid();
        });

        /* ================== LIGAÇÃO COM AS BARRACAS DOS VENDEDORES ==================
           Não cria nenhum sistema novo: só lê as contas de vendedor (feira_accounts)
           e a loja de cada uma (feira_vendor_<email>, já salva pelo Modo Loja) e
           insere essas barracas na mesma lista STALLS que o catálogo já usa. */
        const FALLBACK_STALL_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";

        function hashStallId(str) {
            let h = 0;
            for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; }
            return 900000000 + Math.abs(h);
        }

        function buildVendorStall(email, account) {
            const raw = localStorage.getItem("feira_vendor_" + email);
            if (!raw) return null;
            let dados;
            try { dados = JSON.parse(raw); } catch (e) { return null; }
            const lojaDados = dados.loja || {};
            const produtosDisponiveis = (dados.produtos || []).filter(p => p.disponivel !== false);
            if (!lojaDados.aberta || produtosDisponiveis.length === 0) return null; // loja fechada ou sem produtos: não aparece no catálogo

            const cover = lojaDados.banner || lojaDados.logo || FALLBACK_STALL_IMG;
            return {
                id: hashStallId(email),
                _vendorEmail: email,
                name: lojaDados.nome || account.name || "Barraca",
                category: lojaDados.categoria || "Outros",
                owner: account.owner || account.name || "",
                desc: lojaDados.descricao || "Loja parceira da feira.",
                about: lojaDados.descricao || "Loja parceira da feira.",
                cover,
                gallery: [cover, lojaDados.logo || FALLBACK_STALL_IMG, FALLBACK_STALL_IMG],
                address: "Vitrine da loja na Feira Nuzzi",
                hours: lojaDados.horario || "Consulte o horário na loja",
                products: produtosDisponiveis.map(p => ({
                    name: p.nome, price: p.preco, desc: p.descricao || "", img: p.imagem || FALLBACK_STALL_IMG,
                    estoque: (typeof p.estoque === "number") ? p.estoque : null // repassa o estoque quando existir; sem lógica de bloqueio de compra ainda
                }))
            };
        }

        function refreshVendorStalls() {
            for (let i = STALLS.length - 1; i >= 0; i--) {
                if (STALLS[i]._vendorEmail) STALLS.splice(i, 1);
            }
            let accounts = {};
            try { accounts = typeof getAccounts === "function" ? getAccounts() : {}; } catch (e) { }
            Object.entries(accounts).forEach(([email, acc]) => {
                if (!acc || acc.type !== "vendedor") return;
                const stall = buildVendorStall(email, acc);
                if (stall) STALLS.push(stall);
            });
        }

        /* leva o pedido do cliente até a fila de pedidos do vendedor real (Modo Loja) */
        /* leva a reserva do cliente até a fila de pedidos do vendedor real (Modo Loja).
           `reservaId` hoje é só o número gerado no navegador (ver finalizeOrder) — quando
           o back-end existir, é esse campo que vira a chave primária da reserva (reservationId),
           vinda do banco em vez de gerada localmente. */
        function enviarPedidosParaVendedores(byStall, reservaId) {
            const session = typeof readSession === "function" ? readSession() : null;
            const clienteNome = (session && session.name) || "Cliente da feira";
            Object.entries(byStall).forEach(([stallId, dadosStall]) => {
                const stall = STALLS.find(s => String(s.id) === String(stallId));
                if (!stall || !stall._vendorEmail) return; // barraca de exemplo, sem loja real vinculada
                const chave = "feira_vendor_" + stall._vendorEmail;
                let dados;
                try { dados = JSON.parse(localStorage.getItem(chave) || "{}"); } catch (e) { dados = {}; }
                dados.pedidos = dados.pedidos || [];
                const valorNumerico = dadosStall.items.reduce((soma, item) => soma + parsePrice(item.price) * item.qty, 0);
                dados.pedidos.unshift({
                    id: Date.now() + Math.floor(Math.random() * 1000), // chave interna do pedido no Modo Loja
                    reservaId: reservaId || null, // referência à reserva do cliente (mesmo número do ticket)
                    cliente: clienteNome,
                    itens: dadosStall.items.map(item => `${item.qty}x ${item.name}`).join(", "),
                    valor: formatBRL(valorNumerico),
                    valorNumerico,
                    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                    status: 'pendente'
                });
                localStorage.setItem(chave, JSON.stringify(dados));
            });
        }


        /* ================== CARRINHO (PROTÓTIPO) ==================
           ⚠️ Armazenamento TEMPORÁRIO em localStorage — só existe no navegador
           do próprio cliente, sem sincronia entre dispositivos e sem persistência
           real. Quando o back-end (API + banco) entrar, getCart()/saveCart() e as
           funções de reserva abaixo devem ser trocadas por chamadas à API,
           mantendo a mesma assinatura pra não precisar mexer em quem as chama. */
        function getCart() {
            return JSON.parse(localStorage.getItem('feira_cart') || '[]');
        }
        function saveCart(cart) {
            localStorage.setItem('feira_cart', JSON.stringify(cart));
            updateCartBadge();
        }
        function parsePrice(priceStr) {
            const match = priceStr.match(/[\d.,]+/);
            if (!match) return 0;
            return parseFloat(match[0].replace(/\./g, '').replace(',', '.')) || 0;
        }
        function addToCart(stallId, productIdx) {
            const stall = STALLS.find(s => s.id === stallId);
            const product = stall.products[productIdx];
            const cart = getCart();
            const key = `${stallId}__${productIdx}`;
            const existing = cart.find(item => item.key === key);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({
                    key,
                    stallId,
                    stallName: stall.name,
                    stallAddress: stall.address,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    qty: 1
                });
            }
            saveCart(cart);
        }
        function updateCartQty(key, delta) {
            let cart = getCart();
            const item = cart.find(i => i.key === key);
            if (!item) return;
            item.qty += delta;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.key !== key);
            }
            saveCart(cart);
            renderCartPanel();
        }
        function removeCartItem(key) {
            const cart = getCart().filter(i => i.key !== key);
            saveCart(cart);
            renderCartPanel();
        }
        function cartTotal(cart) {
            return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
        }
        function formatBRL(value) {
            return 'R$ ' + value.toFixed(2).replace('.', ',');
        }
        function updateCartBadge() {
            const cart = getCart();
            const count = cart.reduce((sum, i) => sum + i.qty, 0);
            const badge = document.getElementById('cartBadge');
            if (count > 0) {
                badge.style.display = 'flex';
                badge.textContent = count;
            } else {
                badge.style.display = 'none';
            }
        }

        const cartBtn = document.getElementById('cartBtn');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContent = document.getElementById('cartContent');

        function openCart() {
            renderCartPanel();
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeCart() {
            cartOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        cartBtn.addEventListener('click', openCart);
        document.getElementById('cartClose').addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeCart(); });

        function renderCartPanel() {
            const cart = getCart();
            if (cart.length === 0) {
                cartContent.innerHTML = `<div class="cart-empty">Seu carrinho está vazio.<br>Adicione produtos das barraquinhas!</div>`;
                return;
            }
            const total = cartTotal(cart);
            cartContent.innerHTML = `
    ${cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="stall">${item.stallName}</div>
          <div class="price">${item.price}</div>
        </div>
        <div class="qty-controls">
          <button data-action="dec" data-key="${item.key}">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-key="${item.key}">+</button>
        </div>
      </div>
    `).join('')}
    <div class="cart-total">
      <span>Total estimado</span>
      <span>${formatBRL(total)}</span>
    </div>
    <button class="cart-checkout" id="checkoutBtn">Revisar pedido</button>
  `;
            cartContent.querySelectorAll('[data-action="inc"]').forEach(btn => {
                btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-key'), 1));
            });
            cartContent.querySelectorAll('[data-action="dec"]').forEach(btn => {
                btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-key'), -1));
            });
            document.getElementById('checkoutBtn').addEventListener('click', openConfirm);
        }

        /* ---------- confirmação (dupla verificação) ---------- */
        const confirmOverlay = document.getElementById('confirmOverlay');
        const confirmPanel = document.getElementById('confirmPanel');

        function groupCartByStall(cart) {
            const byStall = {};
            cart.forEach(item => {
                if (!byStall[item.stallId]) {
                    byStall[item.stallId] = { name: item.stallName, address: item.stallAddress, items: [] };
                }
                byStall[item.stallId].items.push(item);
            });
            return byStall;
        }

        function openConfirm() {
            const cart = getCart();
            if (cart.length === 0) return;

            const byStall = groupCartByStall(cart);
            const total = cartTotal(cart);

            confirmPanel.innerHTML = `
    <button class="close" id="confirmClose">✕</button>
    <h2>Confira sua reserva</h2>
    <p class="sub">Verifique os itens e as barraquinhas antes de confirmar. Essa é sua segunda verificação antes do ticket ser gerado.</p>
    ${Object.values(byStall).map(stall => `
      <div class="confirm-stall">
        <div class="stall-name">📍 ${stall.name}</div>
        ${stall.items.map(item => `
          <div class="citem">
            <span>${item.qty}x ${item.name}</span>
            <span>${item.price}</span>
          </div>
        `).join('')}
      </div>
    `).join('')}
    <div class="confirm-total">
      <span>Valor estimado dos itens</span>
      <span>${formatBRL(total)}</span>
    </div>
    <label class="confirm-check">
      <input type="checkbox" id="confirmCheck">
      <span>Confirmo que revisei os itens, as quantidades e as barraquinhas de retirada acima e desejo finalizar a reserva.</span>
    </label>
    <div class="confirm-actions">
      <button class="confirm-back" id="confirmBack">Voltar ao carrinho</button>
      <button class="confirm-final" id="confirmFinal" disabled>Confirmar reserva</button>
    </div>
  `;

            cartOverlay.classList.remove('open');
            confirmOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';

            const checkbox = document.getElementById('confirmCheck');
            const finalBtn = document.getElementById('confirmFinal');
            checkbox.addEventListener('change', () => {
                finalBtn.disabled = !checkbox.checked;
            });

            document.getElementById('confirmClose').addEventListener('click', closeConfirm);
            document.getElementById('confirmBack').addEventListener('click', () => {
                closeConfirm();
                openCart();
            });
            finalBtn.addEventListener('click', () => {
                if (!checkbox.checked) return;
                finalizeOrder();
            });
        }
        function closeConfirm() {
            confirmOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        confirmOverlay.addEventListener('click', (e) => { if (e.target === confirmOverlay) closeConfirm(); });

        /* ---------- ticket de retirada ---------- */
        const ticketOverlay = document.getElementById('ticketOverlay');
        const ticketPanel = document.getElementById('ticketPanel');

        function finalizeOrder() {
            const cart = getCart();
            if (cart.length === 0) return;

            const byStall = groupCartByStall(cart);
            /* reservationId: identificador local da reserva, gerado no navegador.
               Serve de base conceitual para o futuro orderId/reservationId vindo
               do back-end (hoje é só um número aleatório, sem garantia de unicidade
               entre dispositivos — isso passa a ser responsabilidade da API/banco
               quando entrarem no lugar do localStorage). */
            const reservationId = '#' + Math.floor(100000 + Math.random() * 900000);
            const total = cartTotal(cart);

            ticketPanel.innerHTML = `
    <button class="close" id="ticketClose">✕</button>
    <div class="ticket-head">
      <span class="stamp">Reserva confirmada</span>
      <h2>Seu ticket de retirada</h2>
      <div class="order-id">Reserva ${reservationId}</div>
    </div>
    ${Object.values(byStall).map(stall => `
      <div class="ticket-stall">
        <div class="stall-name">📍 ${stall.name}</div>
        <div class="stall-addr">${stall.address}</div>
        ${stall.items.map(item => `
          <div class="titem">
            <span>${item.qty}x ${item.name}</span>
            <span>${item.price}</span>
          </div>
        `).join('')}
      </div>
    `).join('')}
    <div class="ticket-foot">
      <span>Total estimado</span>
      <span>${formatBRL(total)}</span>
    </div>
    <div class="ticket-note">Mostre este ticket em cada barraquinha listada acima para retirar os itens reservados. Bom passeio pela feira! 🧺</div>
  `;

            enviarPedidosParaVendedores(byStall, reservationId);
            saveCart([]);
            closeConfirm();
            ticketOverlay.classList.add('open');
            document.getElementById('ticketClose').addEventListener('click', closeTicket);
        }
        function closeTicket() {
            ticketOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        ticketOverlay.addEventListener('click', (e) => { if (e.target === ticketOverlay) closeTicket(); });

        updateCartBadge();

        refreshVendorStalls();
        renderFilters();
        renderGrid();



        /* ===================== PRÓXIMO ARQUIVO/BLOCO ===================== */


        /* ================== APP VENDEDOR ================== */

        // ================== "BANCO DE DADOS" EM MEMÓRIA ==================
        // Dados da loja — comece vazio e preencha na tela "Minha loja"
        let loja = {
            nome: "",
            categoria: "",
            descricao: "",
            tempo: "",
            horario: "",
            logo: "",
            banner: "",
            aberta: false
        };

        // Produtos cadastrados pelo lojista — modelo de cada item:
        // { id, nome, descricao, preco, categoria, imagem, disponivel }
        let produtos = [];

        // Pedidos recebidos — modelo de cada item:
        // { id, cliente, itens, valor, valorNumerico, hora, status: 'pendente' | 'preparo' | 'pronto' | 'concluido' | 'cancelado' }
        let pedidos = [];

        let produtoEditandoId = null;
        let produtoImagemAtual = '';
        let lojaBannerAtual = '';
        let lojaLogoAtual = '';
        let pedidoAbertoId = null;

        // ================== NAVEGAÇÃO ==================
        function criarNav(telaAtiva) {
            return `
        <div class="nav-item ${telaAtiva === 'painel' ? 'active' : ''}" onclick="irPara('painel')"><div class="nav-icon">🏠</div><div>Painel</div></div>
        <div class="nav-item ${telaAtiva === 'produtos' ? 'active' : ''}" onclick="irPara('produtos')"><div class="nav-icon">🧺</div><div>Produtos</div></div>
        <div class="nav-item ${telaAtiva === 'pedidos' ? 'active' : ''}" onclick="irPara('pedidos')"><div class="nav-icon">📋</div><div>Pedidos</div></div>
        <div class="nav-item ${telaAtiva === 'loja' ? 'active' : ''}" onclick="irPara('loja')"><div class="nav-icon">🏪</div><div>Loja</div></div>
      `;
        }
        document.getElementById('nav-painel').innerHTML = criarNav('painel');
        document.getElementById('nav-produtos').innerHTML = criarNav('produtos');
        document.getElementById('nav-pedidos-tela').innerHTML = criarNav('pedidos');
        document.getElementById('nav-loja').innerHTML = criarNav('loja');

        function irPara(tela) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(tela).classList.add('active');
            if (tela === 'produtos') renderizarProdutos();
            if (tela === 'pedidos') renderizarPedidos();
            if (tela === 'loja') carregarFormLoja();
            if (tela === 'painel') atualizarPainel();
        }

        // ================== PAINEL ==================
        function alternarStatus() {
            loja.aberta = document.getElementById('status-switch').checked;
            atualizarPainel();
        }

        function atualizarPainel() {
            document.getElementById('painel-nome').textContent = loja.nome || "Minha barraca";
            document.getElementById('painel-categoria').textContent = loja.categoria || "Adicione uma categoria";
            const painelLogo = document.getElementById('painel-logo');
            painelLogo.src = loja.logo || "";
            painelLogo.style.visibility = loja.logo ? 'visible' : 'hidden';
            document.getElementById('status-switch').checked = loja.aberta;
            const sub = document.getElementById('status-sub');
            sub.textContent = loja.aberta ? "Aberto — visível para clientes" : "Fechado";
            sub.className = "status-toggle-sub " + (loja.aberta ? "aberto" : "fechado");

            document.getElementById('stat-produtos').textContent = produtos.length;
            const pedidosAtivos = pedidos.filter(p => p.status !== 'cancelado');
            document.getElementById('stat-pedidos').textContent = pedidosAtivos.length;
            const totalVendido = pedidos.filter(p => p.status !== 'cancelado').reduce((s, p) => s + (p.valorNumerico || 0), 0);
            document.getElementById('stat-vendas').textContent = "R$ " + totalVendido.toLocaleString('pt-BR', { minimumFractionDigits: 0 });

            const listaRecentes = document.getElementById('lista-pedidos-recentes');
            const vazio = document.getElementById('pedidos-vazio');
            listaRecentes.innerHTML = '';
            if (pedidos.length === 0) {
                vazio.style.display = 'block';
            } else {
                vazio.style.display = 'none';
                pedidos.slice(0, 3).forEach(p => listaRecentes.innerHTML += criarPedidoCard(p));
            }
        }

        // ================== PRODUTOS ==================
        function renderizarProdutos() {
            const lista = document.getElementById('lista-produtos');
            const vazio = document.getElementById('produtos-vazio');
            const contador = document.getElementById('produtos-contador');
            lista.innerHTML = '';
            contador.textContent = produtos.length ? produtos.length + (produtos.length === 1 ? ' item' : ' itens') : '';
            if (produtos.length === 0) {
                vazio.style.display = 'flex';
                return;
            }
            vazio.style.display = 'none';
            produtos.forEach(p => {
                lista.innerHTML += `
          <div class="produto-card">
            <img class="produto-card-img" src="${p.imagem || ''}" style="${p.imagem ? '' : 'visibility:hidden;'}">
            <div class="produto-card-info">
              <div class="produto-card-nome">${p.nome}</div>
              <div class="produto-card-desc">${p.descricao || (p.categoria || '')}</div>
              <div class="produto-card-bottom">
                <div class="produto-card-preco">${p.preco}</div>
                <span class="toggle-pill ${p.disponivel ? 'on' : 'off'}">${p.disponivel ? 'Disponível' : 'Indisponível'}</span>
              </div>
            </div>
            <div class="produto-card-actions">
              <button class="icon-btn" onclick="abrirFormProduto(${p.id})" title="Editar">✎</button>
              <button class="icon-btn danger" onclick="confirmarExclusaoProduto(${p.id})" title="Excluir">🗑</button>
            </div>
          </div>`;
            });
        }

        function abrirFormProduto(id = null) {
            produtoEditandoId = id;
            const btnExcluir = document.getElementById('btn-excluir-produto');
            if (id) {
                const p = produtos.find(x => x.id === id);
                document.getElementById('form-titulo').textContent = "Editar produto";
                document.getElementById('input-nome').value = p.nome;
                document.getElementById('input-desc').value = p.descricao || '';
                document.getElementById('input-preco').value = p.preco;
                document.getElementById('input-categoria-produto').value = p.categoria || '';
                document.getElementById('input-disponivel').value = p.disponivel ? "1" : "0";
                produtoImagemAtual = p.imagem || '';
                btnExcluir.style.display = 'block';
            } else {
                document.getElementById('form-titulo').textContent = "Novo produto";
                document.getElementById('input-nome').value = '';
                document.getElementById('input-desc').value = '';
                document.getElementById('input-preco').value = '';
                document.getElementById('input-categoria-produto').value = '';
                document.getElementById('input-disponivel').value = "1";
                produtoImagemAtual = '';
                btnExcluir.style.display = 'none';
            }
            exibirImagemProduto();
            irParaSemNav('produto-form');
        }

        function irParaSemNav(tela) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(tela).classList.add('active');
        }

        function handleProdutoImagem(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                produtoImagemAtual = e.target.result;
                exibirImagemProduto();
            };
            reader.readAsDataURL(file);
        }

        function exibirImagemProduto() {
            const img = document.getElementById('produto-img-tag');
            const icon = document.getElementById('produto-img-icon');
            const texto = document.getElementById('produto-img-text');
            if (produtoImagemAtual) {
                img.src = produtoImagemAtual;
                img.style.display = 'block';
                icon.style.display = 'none';
                texto.textContent = 'Toque para trocar a foto';
            } else {
                img.style.display = 'none';
                icon.style.display = 'block';
                texto.textContent = 'Toque para adicionar uma foto';
            }
        }

        function parsePreco(texto) {
            const numeros = (texto || '').replace(/[^\d,.]/g, '').replace(/\./g, '').replace(',', '.');
            const valor = parseFloat(numeros);
            return isNaN(valor) ? 0 : valor;
        }

        function salvarProduto() {
            const nome = document.getElementById('input-nome').value.trim();
            if (!nome) { document.getElementById('input-nome').focus(); return; }
            let preco = document.getElementById('input-preco').value.trim();
            if (preco && !preco.toUpperCase().startsWith('R$')) preco = 'R$ ' + preco;
            const dados = {
                nome,
                descricao: document.getElementById('input-desc').value.trim(),
                preco: preco || "R$ 0,00",
                categoria: document.getElementById('input-categoria-produto').value.trim(),
                disponivel: document.getElementById('input-disponivel').value === "1",
                imagem: produtoImagemAtual,
                estoque: null // campo reservado para controle de estoque (quantidade); null = estoque não controlado ainda. Sem tela/lógica de estoque por enquanto — só a estrutura pronta pro back-end.
            };
            if (produtoEditandoId) {
                const i = produtos.findIndex(x => x.id === produtoEditandoId);
                produtos[i] = { ...produtos[i], ...dados };
            } else {
                produtos.push({ id: Date.now(), ...dados });
            }
            irPara('produtos');
        }

        function confirmarExclusaoProduto(id) {
            const p = produtos.find(x => x.id === id);
            if (!p) return;
            if (confirm(`Excluir "${p.nome}" do cardápio?`)) {
                produtos = produtos.filter(x => x.id !== id);
                renderizarProdutos();
                atualizarPainel();
            }
        }

        function excluirProduto() {
            confirmarExclusaoProduto(produtoEditandoId);
            if (!produtos.find(x => x.id === produtoEditandoId)) irPara('produtos');
        }

        // ================== PEDIDOS ==================
        const STATUS_LABEL = { pendente: 'Pendente', preparo: 'Em preparo', pronto: 'Pronto', concluido: 'Concluído', cancelado: 'Cancelado' };
        const STATUS_BADGE = { pendente: 'badge-pendente', preparo: 'badge-preparo', pronto: 'badge-pronto', concluido: 'badge-pronto', cancelado: 'badge-cancelado' };

        function criarPedidoCard(p) {
            return `
        <div class="pedido-card" onclick="abrirPedidoSheet(${p.id})">
          <div class="pedido-icon">🛍️</div>
          <div class="pedido-info">
            <div class="pedido-top">
              <div class="pedido-cliente">${p.cliente}</div>
              <span class="badge ${STATUS_BADGE[p.status]}">${STATUS_LABEL[p.status]}</span>
            </div>
            <div class="pedido-itens">${p.itens}</div>
            <div class="pedido-hora">${p.hora}</div>
          </div>
          <div class="pedido-valor">${p.valor}</div>
        </div>`;
        }

        function renderizarPedidos() {
            const lista = document.getElementById('lista-pedidos-todos');
            const vazio = document.getElementById('pedidos-todos-vazio');
            lista.innerHTML = '';
            if (pedidos.length === 0) {
                vazio.style.display = 'flex';
                return;
            }
            vazio.style.display = 'none';
            pedidos.forEach(p => lista.innerHTML += criarPedidoCard(p));
        }

        const NOMES_TESTE = ["Marcos Silva", "Juliana Costa", "Pedro Almeida", "Fernanda Lima", "Rafael Souza", "Camila Rocha"];
        function simularPedido() {
            let itens, valorNumerico;
            if (produtos.length > 0) {
                const p1 = produtos[Math.floor(Math.random() * produtos.length)];
                const qtd = 1 + Math.floor(Math.random() * 2);
                itens = `${qtd}x ${p1.nome}`;
                valorNumerico = parsePreco(p1.preco) * qtd;
            } else {
                itens = "1x Item do cardápio";
                valorNumerico = 20 + Math.floor(Math.random() * 30);
            }
            const agora = new Date();
            const novo = {
                id: Date.now(),
                cliente: NOMES_TESTE[Math.floor(Math.random() * NOMES_TESTE.length)],
                itens,
                valor: "R$ " + valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
                valorNumerico,
                hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                status: 'pendente'
            };
            pedidos.unshift(novo);
            renderizarPedidos();
            atualizarPainel();
        }

        function abrirPedidoSheet(id) {
            pedidoAbertoId = id;
            const p = pedidos.find(x => x.id === id);
            if (!p) return;
            document.getElementById('sheet-content').innerHTML = `
        <div class="sheet-title">${p.cliente}</div>
        <div class="sheet-sub">Pedido feito às ${p.hora}</div>
        <div class="sheet-row"><span class="sheet-row-label">Itens</span><span class="sheet-row-value">${p.itens}</span></div>
        <div class="sheet-row"><span class="sheet-row-label">Total</span><span class="sheet-row-value">${p.valor}</span></div>
        <div class="sheet-row"><span class="sheet-row-label">Status</span><span class="badge ${STATUS_BADGE[p.status]}">${STATUS_LABEL[p.status]}</span></div>
        <div class="sheet-actions" id="sheet-acoes"></div>
      `;
            renderizarAcoesPedido(p);
            document.getElementById('sheet-overlay').classList.add('active');
        }

        function renderizarAcoesPedido(p) {
            const acoes = document.getElementById('sheet-acoes');
            let html = '';
            if (p.status === 'pendente') {
                html += `<button class="btn-primary" onclick="mudarStatusPedido('preparo')">Aceitar pedido</button>`;
                html += `<button class="btn-outline" onclick="mudarStatusPedido('cancelado')">Recusar pedido</button>`;
            } else if (p.status === 'preparo') {
                html += `<button class="btn-primary" onclick="mudarStatusPedido('pronto')">Marcar como pronto</button>`;
                html += `<button class="btn-outline" onclick="mudarStatusPedido('cancelado')">Cancelar pedido</button>`;
            } else if (p.status === 'pronto') {
                html += `<button class="btn-primary" onclick="mudarStatusPedido('concluido')">Confirmar entrega</button>`;
            } else {
                html += `<button class="btn-outline" style="color:var(--texto-sec); border-color:var(--borda);" onclick="fecharSheet()">Fechar</button>`;
            }
            acoes.innerHTML = html;
        }

        function mudarStatusPedido(novoStatus) {
            const p = pedidos.find(x => x.id === pedidoAbertoId);
            if (!p) return;
            p.status = novoStatus;
            renderizarPedidos();
            atualizarPainel();
            abrirPedidoSheet(pedidoAbertoId);
        }

        function fecharSheet() {
            document.getElementById('sheet-overlay').classList.remove('active');
            pedidoAbertoId = null;
        }

        // ================== PERFIL DA LOJA ==================
        function carregarFormLoja() {
            document.getElementById('loja-input-nome').value = loja.nome;
            document.getElementById('loja-input-categoria').value = loja.categoria;
            document.getElementById('loja-input-desc').value = loja.descricao;
            document.getElementById('loja-input-tempo').value = loja.tempo;
            document.getElementById('loja-input-horario').value = loja.horario;
            lojaBannerAtual = loja.banner || '';
            lojaLogoAtual = loja.logo || '';
            exibirImagemLoja();
        }

        function exibirImagemLoja() {
            const banner = document.getElementById('loja-banner-preview');
            const logo = document.getElementById('loja-logo-preview');
            banner.src = lojaBannerAtual || '';
            banner.style.display = lojaBannerAtual ? 'block' : 'none';
            logo.src = lojaLogoAtual || '';
            logo.style.display = lojaLogoAtual ? 'block' : 'none';
        }

        function handleLojaImagem(event, tipo) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                if (tipo === 'banner') lojaBannerAtual = e.target.result;
                else lojaLogoAtual = e.target.result;
                exibirImagemLoja();
            };
            reader.readAsDataURL(file);
        }

        function salvarLoja() {
            loja.nome = document.getElementById('loja-input-nome').value.trim();
            loja.categoria = document.getElementById('loja-input-categoria').value.trim();
            loja.descricao = document.getElementById('loja-input-desc').value.trim();
            loja.tempo = document.getElementById('loja-input-tempo').value.trim();
            loja.horario = document.getElementById('loja-input-horario').value.trim();
            loja.banner = lojaBannerAtual;
            loja.logo = lojaLogoAtual;
            atualizarPainel();
            irPara('painel');
        }

        // ================== INÍCIO ==================
        atualizarPainel();



        /* ===================== PRÓXIMO ARQUIVO/BLOCO ===================== */


        /* ================== SISTEMA DE LOGIN ÚNICO (PROTÓTIPO) ==================
           ⚠️ Contas e senhas hoje ficam em localStorage, sem hash e sem backend —
           isso é só pra demonstração. Quando a API/banco entrar, getAccounts()/
           saveAccounts() saem e a autenticação passa a ser feita no servidor.
        
           O campo "type" define o papel da conta: "cliente" | "vendedor" | "adm".
           O tipo NUNCA deve ser definido pelo front a partir de escolha do usuário —
           hoje o cadastro público só cria "cliente" (fixo no código, ver
           registerForm mais abaixo). Contas "vendedor" e "adm" só existem se forem
           criadas manualmente (aqui, ou futuramente pelo back-end/admin). */
        function escHtml(s) {
            return String(s ?? "").replace(/[&<>"']/g, c => ({
                "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
            }[c]));
        }

        /* Contas de demonstração — dados fictícios só pra testar o protótipo,
           não representam clientes/vendedores reais. */
        function getAccounts() {
            const raw = localStorage.getItem("feira_accounts");
            if (raw) return JSON.parse(raw);
            const seeded = {
                "cliente@feiranuzzi.com": { pass: "compras123", type: "cliente", name: "Cliente Demo (conta de teste)" },
                "nino@feiranuzzi.com": { pass: "colheita2024", type: "vendedor", name: "Seu Nino (conta de teste)" }
            };
            localStorage.setItem("feira_accounts", JSON.stringify(seeded));
            return seeded;
        }
        function saveAccounts(a) { localStorage.setItem("feira_accounts", JSON.stringify(a)); }

        function readSession() {
            const local = localStorage.getItem("feira_session");
            if (local) return JSON.parse(local);
            const temp = sessionStorage.getItem("feira_session");
            return temp ? JSON.parse(temp) : null;
        }
        function writeSession(data, remember) {
            clearSession();
            const raw = JSON.stringify(data);
            if (remember) localStorage.setItem("feira_session", raw);
            else sessionStorage.setItem("feira_session", raw);
        }
        function clearSession() {
            localStorage.removeItem("feira_session");
            sessionStorage.removeItem("feira_session");
        }

        const tabLoginBtn = document.getElementById("tabLoginBtn");
        const tabRegisterBtn = document.getElementById("tabRegisterBtn");
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");
        const lpTitle = document.getElementById("lpTitle");
        const lpSub = document.getElementById("lpSub");

        tabLoginBtn.addEventListener("click", () => {
            tabLoginBtn.classList.add("active");
            tabRegisterBtn.classList.remove("active");
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            lpTitle.textContent = "Entrar";
            lpSub.textContent = "Acesse com o mesmo login, cliente ou vendedor — a gente leva você pro lugar certo.";
        });
        tabRegisterBtn.addEventListener("click", () => {
            tabRegisterBtn.classList.add("active");
            tabLoginBtn.classList.remove("active");
            registerForm.style.display = "block";
            loginForm.style.display = "none";
            lpTitle.textContent = "Criar conta";
            lpSub.textContent = "Crie sua conta de cliente pra reservar produtos na feira.";
        });

        /* cadastro público é sempre de cliente; contas de vendedor são criadas por outro meio */
        const regType = "cliente";

        document.querySelectorAll(".toggle-eye").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = document.getElementById(btn.dataset.target);
                const use = btn.querySelector("use");
                const showing = target.type === "password";
                target.type = showing ? "text" : "password";
                use.setAttribute("href", showing ? "#i-eye-off" : "#i-eye");
                btn.setAttribute("aria-label", showing ? "Ocultar senha" : "Mostrar senha");
            });
        });

        document.getElementById("forgotBtn").addEventListener("click", () => {
            const msg = document.getElementById("forgotMsg");
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 4000);
        });

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const pass = document.getElementById("loginPass").value;
            const remember = document.getElementById("rememberMe").checked;
            const acc = getAccounts()[email];
            const errorEl = document.getElementById("loginError");
            if (!acc || acc.pass !== pass) {
                errorEl.classList.add("show");
                return;
            }
            errorEl.classList.remove("show");
            writeSession({ email, type: acc.type, name: acc.name }, remember);
            enterApp(acc.type, acc.name, email);
        });

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim().toLowerCase();
            const pass = document.getElementById("regPass").value;
            const errorEl = document.getElementById("registerError");
            const accounts = getAccounts();
            if (accounts[email]) {
                errorEl.textContent = "Este e-mail já está cadastrado.";
                errorEl.classList.add("show");
                return;
            }
            errorEl.classList.remove("show");
            // type é sempre "cliente" aqui — cadastro público não define tipo de conta.
            // Contas "vendedor" e "adm" não são criadas pelo front (ver seed em getAccounts()).
            accounts[email] = { pass, type: "cliente", name };
            saveAccounts(accounts);
            writeSession({ email, type: regType, name: accounts[email].name }, true);
            enterApp(regType, accounts[email].name, email);
        });

        function enterApp(type, name, email, extra) {
            document.getElementById("loginScreen").classList.add("hidden");
            document.getElementById("loginNote").classList.remove("show");
            if (type === "vendedor") {
                document.getElementById("app-cliente").style.display = "none";
                document.getElementById("app-vendedor").style.display = "block";
                if (typeof prepararLojaNoLogin === "function") prepararLojaNoLogin(name, email, extra);
            } else {
                // "cliente" cai aqui hoje. type "adm" também cai aqui por enquanto —
                // ainda não existe uma tela de administração; quando for criada,
                // basta adicionar um `else if(type === "adm"){ ... }` acima.
                document.getElementById("app-vendedor").style.display = "none";
                document.getElementById("app-cliente").style.display = "block";
            }
            injectLogoutControls(type, name);
            resumePendingAction();
        }

        /* ================== CATÁLOGO ABERTO + LOGIN SOB DEMANDA ==================
           pendingAction guarda a ação que o cliente tentou fazer sem estar logado,
           pra retomar automaticamente assim que o login for concluído. Formatos:
           { type: "checkout" } ou { type: "add-to-cart", stallId, idx } */
        let pendingAction = null;

        function showCatalog() {
            document.getElementById("loginScreen").classList.add("hidden");
            document.getElementById("loginNote").classList.remove("show");
            document.getElementById("app-vendedor").style.display = "none";
            document.getElementById("app-cliente").style.display = "block";
            if (typeof refreshVendorStalls === "function") {
                refreshVendorStalls();
                renderFilters();
                renderGrid();
            }
        }

        function showLogin(reason) {
            document.getElementById("loginScreen").classList.remove("hidden");
            const note = document.getElementById("loginNote");
            if (reason === "checkout" || reason === "add-to-cart") {
                note.textContent = reason === "checkout"
                    ? "Faça login (ou crie sua conta) pra finalizar a reserva."
                    : "Faça login (ou crie sua conta) pra adicionar itens ao carrinho.";
                note.classList.add("show");
            } else {
                note.classList.remove("show");
            }
        }

        document.getElementById("openLoginBtn").addEventListener("click", () => showLogin());
        document.getElementById("backToCatalogBtn").addEventListener("click", () => {
            pendingAction = null;
            showCatalog();
        });

        function resumePendingAction() {
            if (!pendingAction) return;
            const action = pendingAction;
            pendingAction = null;
            const session = readSession();
            if (!session || session.type !== "cliente") return;
            if (action.type === "checkout" && typeof openConfirm === "function") {
                openConfirm();
            } else if (action.type === "add-to-cart") {
                addToCart(action.stallId, action.idx);
                if (typeof openCart === "function") openCart();
            }
        }

        /* pede login na hora de revisar/fechar a reserva */
        function requireLoginForOrder() {
            const session = readSession();
            if (session && session.type === "cliente") return true;
            pendingAction = { type: "checkout" };
            if (typeof cartOverlay !== "undefined") cartOverlay.classList.remove("open");
            showLogin("checkout");
            return false;
        }

        /* pede login na hora de adicionar um item ao carrinho */
        function requireLoginForCartAction(action) {
            const session = readSession();
            if (session && session.type === "cliente") return true;
            pendingAction = action;
            showLogin("add-to-cart");
            return false;
        }

        document.addEventListener("click", (e) => {
            const btn = e.target.closest("#checkoutBtn");
            if (!btn) return;
            if (!requireLoginForOrder()) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, true);

        function injectLogoutControls(type, name) {
            document.querySelectorAll(".feira-logout-btn").forEach(b => b.remove());
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "feira-logout-btn";
            btn.textContent = "Sair (" + (name || "").split(" ")[0] + ")";
            btn.addEventListener("click", doLogout);
            if (type === "vendedor") {
                const bar = document.querySelector("#app-vendedor .top-bar");
                if (bar) bar.appendChild(btn);
            } else {
                const actions = document.querySelector("#app-cliente .header-actions");
                if (actions) actions.appendChild(btn);
            }
        }

        function doLogout() {
            clearSession();
            document.querySelectorAll(".feira-logout-btn").forEach(b => b.remove());
            loginForm.reset();
            registerForm.reset();
            showCatalog();
        }

        /* ================== PERSISTÊNCIA DOS DADOS DO VENDEDOR ================== */
        function persistVendorData(email) {
            if (!email) return;
            try {
                localStorage.setItem("feira_vendor_" + email, JSON.stringify({ loja, produtos, pedidos }));
            } catch (e) { }
        }
        function loadVendorData(email) {
            const raw = localStorage.getItem("feira_vendor_" + email);
            return raw ? JSON.parse(raw) : null;
        }

        function prepararLojaNoLogin(name, email, extra) {
            const saved = loadVendorData(email);
            if (saved) {
                loja = saved.loja || loja;
                produtos = saved.produtos || [];
                pedidos = saved.pedidos || [];
            } else if (extra && extra.justRegistered) {
                loja.nome = extra.stallName || name || "";
                loja.categoria = extra.category || "";
            }
            if (typeof irPara === "function") irPara("painel");
            if (typeof atualizarPainel === "function") atualizarPainel();
            if (typeof renderizarProdutos === "function") renderizarProdutos();
            if (typeof renderizarPedidos === "function") renderizarPedidos();
            currentVendorEmail = email;
        }
        let currentVendorEmail = null;

        /* passa a salvar automaticamente após qualquer alteração do lojista */
        ["salvarLoja", "salvarProduto", "excluirProduto", "mudarStatusPedido", "simularPedido"].forEach(fnName => {
            if (typeof window[fnName] === "function") {
                const original = window[fnName];
                window[fnName] = function () {
                    const result = original.apply(this, arguments);
                    persistVendorData(currentVendorEmail);
                    return result;
                };
            }
        });

        /* atualiza o catálogo se outra aba salvar dados de uma loja (mesma origem) */
        window.addEventListener("storage", (e) => {
            if (!e.key) return;
            if (e.key.startsWith("feira_vendor_") || e.key === "feira_accounts") {
                if (document.getElementById("app-cliente").style.display !== "none") {
                    refreshVendorStalls();
                    renderFilters();
                    renderGrid();
                }
            }
        });

        /* ao carregar: sessão ativa entra direto no painel certo; sem sessão, mostra o catálogo */
        (function initSession() {
            const session = readSession();
            if (session && session.type) {
                enterApp(session.type, session.name, session.email);
            } else {
                showCatalog();
            }
        })();


        