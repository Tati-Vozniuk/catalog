fetch("./products.json")
  .then(res => res.json())
  .then(products => {

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    const product = products.find(p => p.id === productId);

    if (!product) return;
    document.getElementById("product-name").textContent = product.name;

    const header = document.getElementById("product-description-header");
    const descriptionContainer = document.getElementById("product-description");

    header.textContent = "";
    descriptionContainer.innerHTML = "";

    if (product.description && product.description.length > 0) {
      header.textContent = product.description[0];

      product.description.slice(1).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        descriptionContainer.appendChild(li);
      });
    }

    const price = document.getElementById("product-price");
    if (price) {
     price.textContent = product.price + " zł";
    }

    let currentIndex = 0;

    const mainImage = document.getElementById("current-image");
    const thumbnailsContainer = document.getElementById("thumbnails");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const images = product.images;

    function renderGallery() {
      if (!images || images.length === 0) return;

      mainImage.src = images[currentIndex];

      if (images.length === 1) {
        thumbnailsContainer.style.display = "none";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        return;
      }

      thumbnailsContainer.style.display = "flex";
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";

      thumbnailsContainer.innerHTML = "";

      images.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img;

        if (index === currentIndex) {
          thumb.classList.add("active");
        }

        thumb.addEventListener("click", () => {
          currentIndex = index;
          updateGallery();
        });

        thumbnailsContainer.appendChild(thumb);
      });

      updateButtons();
    }

    function updateGallery() {
      mainImage.src = images[currentIndex];

      document.querySelectorAll("#thumbnails img")
        .forEach((img, i) => {
          img.classList.toggle("active", i === currentIndex);
        });

      updateButtons();
    }

    function updateButtons() {
      prevBtn.style.display = currentIndex === 0 ? "none" : "block";
      nextBtn.style.display = currentIndex === images.length - 1 ? "none" : "block";
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateGallery();
      }
    });
    renderGallery();
  });