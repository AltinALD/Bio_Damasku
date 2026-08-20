const WHATSAPP_NUMBER = "355673969442"; // 067 396 9442

const products = [
  {
    id: 1,
    name: "Parfum Vajor Dubai",
    category: "parfume",
    price: 2500,
    desc: "Aroma e fortë dhe e qëndrueshme – importuar nga Dubai.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
    badge: "Popullore",
  },
  {
    id: 2,
    name: "Attar Oud Royal",
    category: "parfume",
    price: 3500,
    desc: "Parfum vajor premium me erë oud autentike.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Hurma Premium 1kg",
    category: "hurma",
    price: 1800,
    desc: "Hurma të ëmbla dhe të zgjedhura – cilësi e lartë.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    badge: "Të freskëta",
  },
  {
    id: 4,
    name: "Mjaltë Lulesh 500g",
    category: "mjalt",
    price: 1500,
    desc: "Mjaltë 100% natyrale nga lule të zgjedhura.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80",
    badge: "Natyrale",
  },
  {
    id: 5,
    name: "Pako Miswak 10 copë",
    category: "miswak",
    price: 2000,
    desc: "Pako me 10 miswak – posta falas.",
    image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?auto=format&fit=crop&w=700&q=80",
    badge: "Posta falas",
  },
  {
    id: 6,
    name: "Kena Natyrale",
    category: "kena",
    price: 800,
    desc: "Kena natyrale – të gjitha ngjyrat në gjendje.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80",
    badge: "Gjendje",
  },
  {
    id: 7,
    name: "Vaj Argan Natyral",
    category: "vajra",
    price: 2200,
    desc: "Vaj për flokë dhe lëkurë – pastër dhe natyral.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",
    badge: null,
  },
  {
    id: 8,
    name: "Set Parfume Mini",
    category: "parfume",
    price: 4500,
    desc: "Set me 3 aroma të ndryshme për dhuratë.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?auto=format&fit=crop&w=700&q=80",
    badge: "Ofertë",
  },
];

let cart = [];
let activeFilter = "all";

const productsEl = document.getElementById("products");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const whatsappOrder = document.getElementById("whatsappOrder");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function formatPrice(n) {
  return n.toLocaleString("sq-AL") + " lek";
}

function renderProducts() {
  const list =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  productsEl.innerHTML = list
    .map(
      (p) => `
    <article class="product-card" data-category="${p.category}">
      <div class="product-media">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-meta">
          <span class="price">${formatPrice(p.price)}</span>
          <button class="btn btn-gold btn-sm" onclick="addToCart(${p.id})">Shto</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  openCart();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartCount.textContent = count;

  if (!cart.length) {
    cartItems.innerHTML = `<p class="cart-empty">Shporta është bosh.</p>`;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-line">
        <img class="cart-thumb" src="${item.image}" alt="" />
        <div class="cart-line-info">
          <strong>${item.name}</strong>
          <span class="qty">${item.qty} × ${formatPrice(item.price)}</span>
        </div>
        <span class="line-price">${formatPrice(item.price * item.qty)}</span>
      </div>
    `
      )
      .join("");
  }

  cartTotal.textContent = formatPrice(total);

  const lines = cart
    .map((i) => `• ${i.name} x${i.qty} = ${i.price * i.qty} lek`)
    .join("%0A");
  const msg = `Pershendetje Bio Damasku!%0ADua te porosise:%0A${lines}%0A%0ATotali: ${total} lek`;
  whatsappOrder.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});

document.querySelectorAll(".cat-card").forEach((card) => {
  card.addEventListener("click", () => {
    const filter = card.dataset.filter;
    activeFilter = filter;
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === filter);
    });
    if (!document.querySelector(`.filter-btn[data-filter="${filter}"]`)) {
      activeFilter = "all";
      document.querySelector('.filter-btn[data-filter="all"]').classList.add("active");
    }
    renderProducts();
    document.getElementById("produkte").scrollIntoView({ behavior: "smooth" });
  });
});

renderProducts();
updateCartUI();
