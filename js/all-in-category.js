const categoryNames = {
  "sanding-pads": "Pady do szlifowania",
  "illuminated-sanding-pads": "Podświetlane pady do szlifowania",
  "tile-gadgets": "Gadżety do kafli",
  "other-gadgets": "Inne gadżety"
};

fetch("./products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products-container");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    const titleElement = document.getElementById("category-title");
    if (titleElement) {
     titleElement.textContent = categoryNames[selectedCategory];
    }

    const filteredProducts = selectedCategory
      ? products.filter(p => p.category === selectedCategory)
      : products;

    filteredProducts.forEach(product => {
      const card = document.createElement("div");

      card.innerHTML = `
        <a href="single-product.html?id=${product.id}" class="button-main-products" target="_blank">
            <img src="${product.images[0]}" alt="${product.name}" class="img-main-products">
            <h2 class="text-main-products">
                <span class="product-title">${product.name}</span>
                <span class="text-main-products-price">${product.price}</span>
            </h2>
        </a>
      `;

      container.appendChild(card);
    });
  });