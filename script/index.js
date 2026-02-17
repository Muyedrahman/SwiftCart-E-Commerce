// 
function scrollToSection(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
}

// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBtn = document.querySelector(".fa-shopping-cart");

function updateCartCount() {
  const existingCount = document.querySelector(".cart-count");
  if (existingCount) existingCount.remove();

  if (cart.length > 0) {
    const span = document.createElement("span");
    span.className =
      "cart-count absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full";
    span.innerText = cart.length;
    cartBtn.parentElement.appendChild(span);
  }
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.title.slice(0, 30)}... added to cart!`);
}

// ----- TRENDING PRO---
const loadTrending = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const topProducts = data.slice(0, 6);
  const container = document.getElementById("trending-container");
  container.innerHTML = "";

  topProducts.forEach((product) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg transition";
    div.innerHTML = `
      <img src="${product.image}" class="h-64 w-full object-contain mb-4"/>
      <h3 class="font-semibold mb-2">${product.title.slice(0, 50)}...</h3>
      <p class="text-sm text-gray-500 mb-2">⭐ ${product.rating.rate} (${product.rating.count})</p>
      <p class="font-bold mb-2">$${product.price}</p>
      <div class="flex gap-2">
        <button class="btn btn-primary flex-1" onclick="addToCartHandler(${product.id})">
          <i class="fa-solid fa-cart-shopping mr-2"></i> Add
        </button>
        <button class="btn btn-outline flex-1" onclick="openProductModal(${product.id})">
          <i class="fa-solid fa-eye mr-2"></i> Details
        </button>
      </div>
    `;
    container.appendChild(div);
  });
};

// -- Add To CART handelearrr
function addToCartHandler(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => addToCart(product));
}

//----CATEGORIes--
const loadCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();
  const container = document.getElementById("category-container");
  container.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className = "btn btn-primary rounded-full";
  allBtn.onclick = () => {
    setActiveCategory(allBtn);
    loadProducts();
  };
  container.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.className = "btn btn-outline rounded-full";
    btn.onclick = () => {
      setActiveCategory(btn);
      loadProductsByCategory(cat);
    };
    container.appendChild(btn);
  });
};

function setActiveCategory(activeBtn) {
  document.querySelectorAll("#category-container button").forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("btn-outline");
}

// -------PRODUCTS ---
const loadProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  displayProducts(products);
};

const loadProductsByCategory = async (category) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  );
  const products = await res.json();
  displayProducts(products);
};

const displayProducts = (products) => {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg transition";
    div.innerHTML = `
      <img src="${product.image}" class="h-64 w-full object-contain mb-4"/>
      <h3 class="font-semibold mb-2">${product.title.slice(0, 50)}...</h3>
      <p class="text-sm text-gray-500 mb-2">
        <i class="fa-solid fa-star text-yellow-500 mr-1"></i>
        ${product.rating.rate} (${product.rating.count})
      </p>
      <p class="font-bold mb-2">$${product.price}</p>
      <div class="flex gap-2">
        <button class="btn btn-primary flex-1" onclick="addToCartHandler(${product.id})">
          <i class="fa-solid fa-cart-shopping mr-2"></i> Add
        </button>
        <button class="btn btn-outline flex-1" onclick="openProductModal(${product.id})">
          <i class="fa-solid fa-eye mr-2"></i> Details
        </button>
      </div>
    `;
    container.appendChild(div);
  });
};

// ===== PRODUCT MODAL =====
async function openProductModal(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <img src="${product.image}" class="w-full h-64 object-contain"/>
      <div class="space-y-3">
        <h2 class="text-2xl font-bold">${product.title}</h2>
        <p class="text-gray-600 text-sm">${product.description}</p>
        <div class="flex items-center gap-4">
          <span class="text-2xl font-bold">$${product.price}</span>
          <span>
            <i class="fa-solid fa-star text-yellow-500 mr-1"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
        <button class="btn btn-primary w-full" onclick="addToCartHandler(${product.id})">
          <i class="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
  document.getElementById("product_modal").showModal();
}

function closeModal() {
  document.getElementById("product_modal").close();
}

// 
loadTrending();
loadCategories();
loadProducts();
updateCartCount();
