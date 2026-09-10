/* =====================================================================
   FEIRA NUZZI — FRONT-END (cliente + vendedor)
   Persistência 100% via API Flask + SQLite (ver app.py).
   Só o carrinho do cliente segue em localStorage (estado de UI).
   ===================================================================== */

/* =====================================================================
   1) DADOS FIXOS DO CATÁLOGO (barracas de exemplo)
   ===================================================================== */
const STALLS = [
    {
        id: 1,
        name: "Barraca do Seu Nino",
        category: "Frutas & Verduras",
        owner: "Antônio 'Nino' Ferreira",
        desc: "Produtos direto da roça, colhidos na véspera da feira.",
        about: "Há 22 anos na mesma esquina da feira, o Seu Nino traz frutas e verduras cultivadas em sua própria chácara. A seleção muda com a estação.",
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
        about: "Duas irmãs que transformaram a tradição da avó em ofício. Cada peça é única.",
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
        about: "A fila mais famosa da feira. Dona Célia frita cada pastel na hora do pedido.",
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
        about: "Especializado em plantas ornamentais e temperos vivos.",
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
        about: "A família Bianchi produz queijos artesanais há três gerações.",
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
        about: "O forno a lenha do Zé fica ligado desde as 4h da manhã.",
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

/* =====================================================================
   2) VISITAS (tracking — backend não exige login)
   ===================================================================== */
function registerVisit(id) {
    fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ stallId: id }),
    }).catch(() => { });
}

/* =====================================================================
   3) FILTROS + BUSCA + GRID
   ===================================================================== */
const HIDDEN_CATS = ["Frutas & Verduras", "Artesanato", "Flores & Plantas", "Laticínios"];

function getCategories() {
    return ["Todas", ...new Set(STALLS.map(s => s.category).filter(c => !HIDDEN_CATS.includes(c)))];
}

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const panel = document.getElementById("panel");
const searchInput = document.getElementById("searchInput");

let activeCat = "Todas";
let searchTerm = "";

function renderFilters() {
    const categories = getCategories();
    filtersEl.innerHTML = categories.map(c =>
        `<button data-cat="${c}" class="${c === activeCat ? 'active' : ''}">${c}</button>`
    ).join('');
    filtersEl.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
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

/* =====================================================================
   4) DETALHE DA BARRACA + ADD AO CARRINHO
   ===================================================================== */
function openStall(id) {
    const s = STALLS.find(x => x.id === id);
    if (!s) return;
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

/* =====================================================================
   5) BARRACAS DOS VENDEDORES (vindas da API)
   ===================================================================== */
async function refreshVendorStalls() {
    // Remove barracas de vendedores antigas
    for (let i = STALLS.length - 1; i >= 0; i--) {
        if (STALLS[i]._vendorEmail) STALLS.splice(i, 1);
    }
    try {
        const r = await fetch("/api/stalls", { credentials: "include" });
        if (!r.ok) return;
        const lista = await r.json();
        lista.forEach(s => STALLS.push(s));
    } catch (e) {
        console.warn("Falha ao carregar barracas dos vendedores:", e);
    }
}

/* =====================================================================
   6) CARRINHO (localStorage — estado de UI)
   ===================================================================== */
function getCart() {
    try { return JSON.parse(localStorage.getItem('feira_cart') || '[]'); }
    catch (e) { return []; }
}
function saveCart(cart) {
    localStorage.setItem('feira_cart', JSON.stringify(cart));
    updateCartBadge();
}
function parsePrice(priceStr) {
    const match = String(priceStr).match(/[\d.,]+/);
    if (!match) return 0;
    return parseFloat(match[0].replace(/\./g, '').replace(',', '.')) || 0;
}
function formatBRL(value) {
    return 'R$ ' + Number(value).toFixed(2).replace('.', ',');
}

function addToCart(stallId, productIdx) {
    const stall = STALLS.find(s => s.id === stallId);
    if (!stall) return;
    const product = stall.products[productIdx];
    if (!product) return;
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
            vendorEmail: stall._vendorEmail || null,
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
    if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
    saveCart(cart);
    renderCartPanel();
}
function cartTotal(cart) {
    return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
}
function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
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

/* =====================================================================
   7) CONFIRMAÇÃO + TICKET + ENVIO AO BACK-END
   ===================================================================== */
const confirmOverlay = document.getElementById('confirmOverlay');
const confirmPanel = document.getElementById('confirmPanel');

function groupCartByStall(cart) {
    const byStall = {};
    cart.forEach(item => {
        if (!byStall[item.stallId]) {
            byStall[item.stallId] = {
                name: item.stallName,
                address: item.stallAddress,
                vendorEmail: item.vendorEmail,
                items: []
            };
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
        <p class="sub">Verifique os itens e as barraquinhas antes de confirmar.</p>
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
    checkbox.addEventListener('change', () => { finalBtn.disabled = !checkbox.checked; });

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

const ticketOverlay = document.getElementById('ticketOverlay');
const ticketPanel = document.getElementById('ticketPanel');

async function finalizeOrder() {
    const cart = getCart();
    if (cart.length === 0) return;

    const byStall = groupCartByStall(cart);
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

    enviarPedidosParaVendedores(byStall, reservationId); // fire-and-forget
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

async function enviarPedidosParaVendedores(byStall, reservaId) {
    const stalls = [];
    Object.values(byStall).forEach(stall => {
        if (!stall.vendorEmail) return; // barraca de exemplo
        const valorNum = stall.items.reduce((soma, item) => soma + parsePrice(item.price) * item.qty, 0);
        stalls.push({
            vendorEmail: stall.vendorEmail,
            items: stall.items.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
            valor: formatBRL(valorNum),
            valorNumerico: valorNum
        });
    });
    if (!stalls.length) return;

    try {
        await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ reservaId, stalls }),
        });
    } catch (e) {
        console.warn("Falha ao enviar pedidos:", e);
    }
}

/* =====================================================================
   8) SESSÃO + LOGIN SOB DEMANDA
   ===================================================================== */
let _cachedSession = null;

function readSession() { return _cachedSession; }
function clearSession() { _cachedSession = null; }

async function fetchSession() {
    try {
        const r = await fetch("/api/auth/session", { credentials: "include" });
        _cachedSession = await r.json();
    } catch (e) { _cachedSession = null; }
    return _cachedSession;
}

let pendingAction = null;

function showCatalog() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("loginNote").classList.remove("show");
    document.getElementById("app-vendedor").style.display = "none";
    document.getElementById("app-cliente").style.display = "block";
    refreshVendorStalls().then(() => {
        renderFilters();
        renderGrid();
    });
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

function requireLoginForOrder() {
    if (_cachedSession && _cachedSession.type === "cliente") return true;
    pendingAction = { type: "checkout" };
    if (typeof cartOverlay !== "undefined" && cartOverlay) cartOverlay.classList.remove("open");
    showLogin("checkout");
    return false;
}

function requireLoginForCartAction(action) {
    if (_cachedSession && _cachedSession.type === "cliente") return true;
    pendingAction = action;
    showLogin("add-to-cart");
    return false;
}

function resumePendingAction() {
    if (!pendingAction) return;
    const action = pendingAction;
    pendingAction = null;
    if (!_cachedSession || _cachedSession.type !== "cliente") return;
    if (action.type === "checkout") {
        openConfirm();
    } else if (action.type === "add-to-cart") {
        addToCart(action.stallId, action.idx);
        openCart();
    }
}

document.getElementById("openLoginBtn").addEventListener("click", () => showLogin());
document.getElementById("backToCatalogBtn").addEventListener("click", () => {
    pendingAction = null;
    showCatalog();
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest("#checkoutBtn");
    if (!btn) return;
    if (!requireLoginForOrder()) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}, true);

/* --- injetar botão de logout --- */
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

async function doLogout() {
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "include" }); } catch (e) { }
    clearSession();
    document.querySelectorAll(".feira-logout-btn").forEach(b => b.remove());
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();
    // Limpa estado do vendedor
    loja = { nome: "", categoria: "", descricao: "", tempo: "", horario: "", logo: "", banner: "", aberta: false };
    produtos = [];
    pedidos = [];
    currentVendorEmail = null;
    showCatalog();
}

/* =====================================================================
   9) ENTRAR NO APP (cliente ou vendedor)
   ===================================================================== */
async function enterApp(type, name, email, extra) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("loginNote").classList.remove("show");

    if (type === "vendedor") {
        document.getElementById("app-cliente").style.display = "none";
        document.getElementById("app-vendedor").style.display = "block";
        await prepararLojaNoLogin(name, email, extra);
    } else {
        document.getElementById("app-vendedor").style.display = "none";
        document.getElementById("app-cliente").style.display = "block";
        await refreshVendorStalls();
        renderFilters();
        renderGrid();
    }
    injectLogoutControls(type, name);
    resumePendingAction();
}

/* =====================================================================
   10) TABS DE LOGIN / CADASTRO
   ===================================================================== */
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

/* =====================================================================
   11) SUBMIT DE LOGIN E CADASTRO
   ===================================================================== */
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("loginPass").value;
    const errorEl = document.getElementById("loginError");

    try {
        const r = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, senha: pass }),
        });
        if (!r.ok) {
            errorEl.classList.add("show");
            return;
        }
        errorEl.classList.remove("show");
        _cachedSession = await r.json();
        enterApp(_cachedSession.type, _cachedSession.name, _cachedSession.email);
    } catch (err) {
        errorEl.classList.add("show");
    }
});

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const senha = document.getElementById("regPass").value;
    const errorEl = document.getElementById("registerError");

    try {
        const r = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ nome, email, senha }),
        });
        const body = await r.json();
        if (!r.ok) {
            errorEl.textContent = body.erro || "Erro ao cadastrar.";
            errorEl.classList.add("show");
            return;
        }
        errorEl.classList.remove("show");
        _cachedSession = body;
        enterApp("cliente", body.name, body.email);
    } catch (err) {
        errorEl.textContent = "Falha de rede.";
        errorEl.classList.add("show");
    }
});

/* =====================================================================
   12) APP VENDEDOR
   ===================================================================== */
let loja = { nome: "", categoria: "", descricao: "", tempo: "", horario: "", logo: "", banner: "", aberta: false };
let produtos = [];
let pedidos = [];
let produtoEditandoId = null;
let produtoImagemAtual = '';
let lojaBannerAtual = '';
let lojaLogoAtual = '';
let pedidoAbertoId = null;
let currentVendorEmail = null;

/* --- navegação --- */
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
    document.querySelectorAll('#app-vendedor .screen').forEach(s => s.classList.remove('active'));
    document.getElementById(tela).classList.add('active');
    if (tela === 'produtos') renderizarProdutos();
    if (tela === 'pedidos') renderizarPedidos();
    if (tela === 'loja') carregarFormLoja();
    if (tela === 'painel') atualizarPainel();
}
function irParaSemNav(tela) {
    document.querySelectorAll('#app-vendedor .screen').forEach(s => s.classList.remove('active'));
    document.getElementById(tela).classList.add('active');
}

/* --- carregar dados do back-end --- */
async function recarregarVendedor() {
    try {
        const r = await fetch("/api/vendor/data", { credentials: "include" });
        if (!r.ok) return;
        const dados = await r.json();
        loja = dados.loja || loja;
        produtos = dados.produtos || [];
        pedidos = dados.pedidos || [];
    } catch (e) {
        console.warn("Falha ao recarregar dados do vendedor:", e);
    }
    atualizarPainel();
    renderizarProdutos();
    renderizarPedidos();
}

async function prepararLojaNoLogin(name, email, extra) {
    currentVendorEmail = email;
    await recarregarVendedor();
    if ((!loja.nome || loja.nome === "") && (extra && extra.justRegistered)) {
        loja.nome = extra.stallName || name || "";
        loja.categoria = extra.category || "";
        await salvarLoja();
    }
    irPara("painel");
}

/* --- painel --- */
function atualizarPainel() {
    const elNome = document.getElementById('painel-nome');
    if (!elNome) return;
    elNome.textContent = loja.nome || "Minha barraca";
    document.getElementById('painel-categoria').textContent = loja.categoria || "Adicione uma categoria";

    const painelLogo = document.getElementById('painel-logo');
    painelLogo.src = loja.logo || "";
    painelLogo.style.visibility = loja.logo ? 'visible' : 'hidden';

    document.getElementById('status-switch').checked = !!loja.aberta;
    const sub = document.getElementById('status-sub');
    sub.textContent = loja.aberta ? "Aberto — visível para clientes" : "Fechado";
    sub.className = "status-toggle-sub " + (loja.aberta ? "aberto" : "fechado");

    document.getElementById('stat-produtos').textContent = produtos.length;
    const pedidosAtivos = pedidos.filter(p => p.status !== 'cancelado');
    document.getElementById('stat-pedidos').textContent = pedidosAtivos.length;
    const totalVendido = pedidosAtivos.reduce((s, p) => s + (Number(p.valorNumerico) || 0), 0);
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

async function alternarStatus() {
    loja.aberta = document.getElementById('status-switch').checked;
    atualizarPainel();
    try {
        await fetch("/api/vendor/loja", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ aberta: loja.aberta }),
        });
    } catch (e) { }
}

/* --- produtos --- */
function renderizarProdutos() {
    const lista = document.getElementById('lista-produtos');
    const vazio = document.getElementById('produtos-vazio');
    const contador = document.getElementById('produtos-contador');
    if (!lista) return;
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
        if (!p) return;
        document.getElementById('form-titulo').textContent = "Editar produto";
        document.getElementById('input-nome').value = p.nome;
        document.getElementById('input-desc').value = p.descricao || '';
        document.getElementById('input-preco').value = p.preco;
        document.getElementById('input-categoria-produto').value = p.categoria || '';
        document.getElementById('input-estoque').value = (p.estoque === null || p.estoque === undefined) ? '' : p.estoque;
        document.getElementById('input-disponivel').value = p.disponivel ? "1" : "0";
        produtoImagemAtual = p.imagem || '';
        btnExcluir.style.display = 'block';
    } else {
        document.getElementById('form-titulo').textContent = "Novo produto";
        document.getElementById('input-nome').value = '';
        document.getElementById('input-desc').value = '';
        document.getElementById('input-preco').value = '';
        document.getElementById('input-categoria-produto').value = '';
        document.getElementById('input-estoque').value = '';
        document.getElementById('input-disponivel').value = "1";
        produtoImagemAtual = '';
        btnExcluir.style.display = 'none';
    }
    exibirImagemProduto();
    irParaSemNav('produto-form');
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

async function salvarProduto() {
    const nome = document.getElementById('input-nome').value.trim();
    if (!nome) { document.getElementById('input-nome').focus(); return; }

    let preco = document.getElementById('input-preco').value.trim();
    if (preco && !preco.toUpperCase().startsWith('R$')) preco = 'R$ ' + preco;
    if (!preco) preco = 'R$ 0,00';

    const estoqueRaw = document.getElementById('input-estoque').value.trim();
    const estoque = estoqueRaw === '' ? null : parseInt(estoqueRaw, 10);

    const payload = {
        nome,
        descricao: document.getElementById('input-desc').value.trim(),
        preco,
        categoria: document.getElementById('input-categoria-produto').value.trim(),
        disponivel: document.getElementById('input-disponivel').value === "1",
        imagem: produtoImagemAtual,
        estoque: Number.isNaN(estoque) ? null : estoque,
    };

    try {
        const url = produtoEditandoId
            ? `/api/vendor/produtos/${produtoEditandoId}`
            : `/api/vendor/produtos`;
        const method = produtoEditandoId ? "PUT" : "POST";
        const r = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });
        if (!r.ok) {
            const erro = await r.json().catch(() => ({}));
            alert(erro.erro || "Erro ao salvar produto.");
            return;
        }
    } catch (e) {
        alert("Falha de rede ao salvar produto.");
        return;
    }
    await recarregarVendedor();
    irPara('produtos');
}

async function confirmarExclusaoProduto(id) {
    const p = produtos.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`Excluir "${p.nome}" do cardápio?`)) return;
    try {
        await fetch(`/api/vendor/produtos/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
    } catch (e) { }
    await recarregarVendedor();
}

async function excluirProduto() {
    if (!produtoEditandoId) return;
    await confirmarExclusaoProduto(produtoEditandoId);
    irPara('produtos');
}

/* --- pedidos --- */
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
    if (!lista) return;
    lista.innerHTML = '';
    if (pedidos.length === 0) {
        vazio.style.display = 'flex';
        return;
    }
    vazio.style.display = 'none';
    pedidos.forEach(p => lista.innerHTML += criarPedidoCard(p));
}

const NOMES_TESTE = ["Marcos Silva", "Juliana Costa", "Pedro Almeida", "Fernanda Lima", "Rafael Souza", "Camila Rocha"];

/* Pedido teste é LOCAL — não vai pro banco, só demonstra a UI. */
async function simularPedido() {
    let itens, valorNumerico;
    if (produtos.length > 0) {
        const p1 = produtos[Math.floor(Math.random() * produtos.length)];
        const qtd = 1 + Math.floor(Math.random() * 2);
        itens = `${qtd}x ${p1.nome}`;
        valorNumerico = parsePrice(p1.preco) * qtd;
    } else {
        itens = "1x Item do cardápio";
        valorNumerico = 20 + Math.floor(Math.random() * 30);
    }
    const agora = new Date();
    const novo = {
        id: Date.now(),
        _local: true,
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

async function mudarStatusPedido(novoStatus) {
    const p = pedidos.find(x => x.id === pedidoAbertoId);
    if (!p) return;

    // Pedido local (teste) — só atualiza na memória
    if (p._local) {
        p.status = novoStatus;
        renderizarPedidos();
        atualizarPainel();
        abrirPedidoSheet(pedidoAbertoId);
        return;
    }

    try {
        const r = await fetch(`/api/vendor/pedidos/${p.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status: novoStatus }),
        });
        if (!r.ok) return;
    } catch (e) { return; }
    await recarregarVendedor();
    abrirPedidoSheet(pedidoAbertoId);
}

function fecharSheet() {
    document.getElementById('sheet-overlay').classList.remove('active');
    pedidoAbertoId = null;
}

/* --- loja --- */
function carregarFormLoja() {
    document.getElementById('loja-input-nome').value = loja.nome || '';
    document.getElementById('loja-input-categoria').value = loja.categoria || '';
    document.getElementById('loja-input-desc').value = loja.descricao || '';
    document.getElementById('loja-input-tempo').value = loja.tempo || '';
    document.getElementById('loja-input-horario').value = loja.horario || '';
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

async function salvarLoja() {
    loja.nome = document.getElementById('loja-input-nome').value.trim();
    loja.categoria = document.getElementById('loja-input-categoria').value.trim();
    loja.descricao = document.getElementById('loja-input-desc').value.trim();
    loja.tempo = document.getElementById('loja-input-tempo').value.trim();
    loja.horario = document.getElementById('loja-input-horario').value.trim();
    loja.banner = lojaBannerAtual;
    loja.logo = lojaLogoAtual;

    try {
        await fetch("/api/vendor/loja", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(loja),
        });
    } catch (e) { }

    atualizarPainel();
    irPara('painel');
}

/* =====================================================================
   13) INICIALIZAÇÃO
   ===================================================================== */
(async function init() {
    updateCartBadge();

    // Carrega catálogo público primeiro
    await refreshVendorStalls();
    renderFilters();
    renderGrid();

    // Descobre se já existe sessão ativa
    await fetchSession();
    if (_cachedSession && _cachedSession.type) {
        enterApp(_cachedSession.type, _cachedSession.name, _cachedSession.email);
    } else {
        showCatalog();
    }
})();