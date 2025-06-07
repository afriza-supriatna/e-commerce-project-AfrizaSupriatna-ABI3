document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("brandFilter");
  const cards = document.querySelectorAll(".card");
  const cartItems = document.querySelector(".cart-items");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");
  const clearCartBtn = document.getElementById("btn-clear-cart");

  let cart = [];

  filter.addEventListener("change", () => {
    const value = filter.value;
    cards.forEach(card => {
      if (value === "all" || card.dataset.brand === value) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  document.querySelectorAll(".btn-add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      cart.push({ name, price });
      renderCart();
    });
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
      cartItems.appendChild(div);
      total += item.price;
    });

    totalItems.textContent = cart.length;
    totalPrice.textContent = total.toLocaleString();
  }
});
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  totalItems.textContent = cart.length;
  totalPrice.textContent = total.toLocaleString();

  // Update indikator jumlah di header
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}
