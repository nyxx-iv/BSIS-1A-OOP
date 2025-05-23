document.addEventListener("DOMContentLoaded", () =>
{
  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("checkoutModal");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeBtn = modal.querySelector(".close");
  const confirmBtn = document.getElementById("confirm-order");
  const orderItemsContainer = document.getElementById("order-items");
  const modalTotal = document.getElementById("modal-total");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalDisplay = document.getElementById("cart-total");

  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCartItems()
  {
    cartItemsContainer.innerHTML = "";
    if (cartItems.length === 0)
    {
      cartItemsContainer.textContent = "Your cart is empty.";
      cartTotalDisplay.textContent = "₱0.00";
      checkoutBtn.disabled = true;
      return;
    }
    checkoutBtn.disabled = false;

    cartItems.forEach(item =>
    {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      div.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>Price: ₱${price.toFixed(2)}</p>
          <p>Quantity: ${quantity}</p>
        </div>
        <button class="remove-btn" data-name="${item.name}">Remove</button>
      `;

      cartItemsContainer.appendChild(div);
    });

    updateCartTotal();
    }

  function calculateTotal()
  {
    let total = 0;
    cartItems.forEach(item =>
    {
      const price = Number(item.price) || 0;
      const quantity = Math.max(0, parseInt(item.quantity) || 0);
      const itemTotal = price * quantity;
      console.log(`${item.name}: ${price} x ${quantity} = ${itemTotal}`);
      total += itemTotal;
    });
    return total;
  }

  function updateCartTotal()
  {
    const total = calculateTotal();
    cartTotalDisplay.textContent = `₱${total.toFixed(2)}`;
  }

  function renderOrderItems()
  {
    orderItemsContainer.innerHTML = "";
    cartItems.forEach(item =>
    {
      const price = Number(item.price) || 0;
      const quantity = Math.max(0, parseInt(item.quantity) || 0);

      const div = document.createElement("div");
      div.textContent = `${item.name} x${quantity} - ₱${(price * quantity).toFixed(2)}`;
      orderItemsContainer.appendChild(div);
    });
    modalTotal.textContent = `₱${calculateTotal().toFixed(2)}`;
  }

  function openModal()
  {
    renderOrderItems();
    modal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
  }

  function closeModal()
  {
    modal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
  }

  function removeItem(name)
 {
    cartItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
  }

  function showCustomAlert(message, duration = 3000)
  {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert");
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(() =>
    {
      alertDiv.classList.add("hide");
      alertDiv.addEventListener("transitionend", () =>
      {
        alertDiv.remove();
      });
    }, duration);
  }

  checkoutBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  confirmBtn.addEventListener("click", () =>
  {
    showCustomAlert("Thank you for your purchase!");
    cartItems = [];
    localStorage.removeItem('cart');
    renderCartItems();
    closeModal();
  });

  cartItemsContainer.addEventListener("click", e =>
  {
    if (e.target.classList.contains("remove-btn"))
    {
      const name = e.target.getAttribute("data-name");
      removeItem(name);
    }
  });

  renderCartItems();
});
