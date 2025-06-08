document.addEventListener("DOMContentLoaded", function () {
  const brandFilter = document.getElementById("brandFilter");
  const produkCards = document.querySelectorAll(
    "#produk .produk-container .card, #produk-terbaru .produk-container .card"
  );
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalItemsElem = document.getElementById("total-items");
  const totalPriceElem = document.getElementById("total-price");
  const btnClearCart = document.getElementById("btn-clear-cart");

  let cart = [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Keranjang kosong.</p>";
    } else {
      cart.forEach((item, index) => {
        const itemElem = document.createElement("div");
        itemElem.className = "cart-item";
        itemElem.innerHTML = `
          <p><strong>${item.name}</strong> - Rp ${item.price.toLocaleString()} x ${item.qty}</p>
          <button class="btn-remove" data-index="${index}">Hapus</button>
        `;
        cartItemsContainer.appendChild(itemElem);
      });
    }

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    totalItemsElem.textContent = totalItems;
    totalPriceElem.textContent = totalPrice.toLocaleString();
  }

  // Tambah item ke keranjang
  function addToCart(name, price) {
    // Cek jika item sudah ada, tambah qty
    const existingIndex = cart.findIndex((item) => item.name === name);
    if (existingIndex > -1) {
      cart[existingIndex].qty++;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }
    renderCart();
  }

  
  document.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      // Parsing harga string ke number
      let priceStr = this.getAttribute("data-price").toString().replace(/\./g, "");
      const price = parseInt(priceStr, 10);
      addToCart(name, price);
      alert(`Produk "${name}" berhasil ditambahkan ke keranjang.`);
    });
  });

  
  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-remove")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      renderCart();
    }
  });

  
  btnClearCart.addEventListener("click", function () {
    if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
      cart = [];
      renderCart();
    }
  });

  brandFilter.addEventListener("change", function () {
    const selectedBrand = this.value;

    produkCards.forEach((card) => {
      const cardBrand = card.getAttribute("data-brand");

      if (selectedBrand === "all") {
        card.style.display = "block";
      } else if (selectedBrand === "produk terbaru") {
        if (cardBrand === "produk terbaru") {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      } else {
        if (cardBrand === selectedBrand) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });

    if (selectedBrand === "produk terbaru") {
      document.getElementById("produk-terbaru").style.display = "block";
      document.getElementById("produk").style.display = "none";
    } else if (selectedBrand === "all") {
      document.getElementById("produk-terbaru").style.display = "block";
      document.getElementById("produk").style.display = "block";
    } else {
      document.getElementById("produk-terbaru").style.display = "none";
      document.getElementById("produk").style.display = "block";
    }
  });

  renderCart();
  document.getElementById("produk-terbaru").style.display = "block";
  document.getElementById("produk").style.display = "block";
});
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
