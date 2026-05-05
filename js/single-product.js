// Отримуємо id товару з URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// Читаємо JSON
fetch("./products.json")
  .then(response => response.json())
  .then(products => {

    // Знаходимо потрібний товар
    const product = products.find(p => p.id === productId);

    if (!product) {
      document.body.innerHTML = "<h1>Товар не знайдено</h1>";
      return;
    }

    // Назва товару
    document.getElementById("productName").innerText = product.name;

    // Gallery
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.getElementById("thumbnails");

    // Перше фото = головне
    mainImage.src = product.images[0];

    // Генеруємо мініатюри
    product.images.forEach(imagePath => {

      const img = document.createElement("img");

      img.src = imagePath;
      img.width = 70;
      img.style.cursor = "pointer";

      // Клік → змінити головне фото
      img.addEventListener("click", () => {
        mainImage.src = imagePath;
      });

      thumbnails.appendChild(img);
    });

  });