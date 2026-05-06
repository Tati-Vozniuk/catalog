let allProducts = [];

fetch("./products.json")
  .then(res => res.json())
  .then(products => {
    allProducts = products; 

    renderProducts("products-container-1", [1, 2, 3]);
    renderProducts("products-container-2", [12, 14, 13]);
    renderProducts("products-container-3", [4, 5, 6]);
    renderProducts("products-container-4", [7, 17, 9]);
  });

function renderProducts(containerId, ids) {
  const container = document.getElementById(containerId);

  if (!container) return; 

  const filtered = allProducts.filter(p => ids.includes(p.id));

  filtered.forEach(product => {
    const card = document.createElement("a");

    card.href = `single-product.html?id=${product.id}`;
    card.target = "_blank";
    card.className = "button-main-products";

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="img-main-products">
      <h2 class="text-main-products">
        <span class="product-title">${product.name}</span>
        <span class="text-main-products-price">${product.price} zl</span>
      </h2>
    `;

    container.appendChild(card);
  });
}