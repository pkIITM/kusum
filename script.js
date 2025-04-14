document.addEventListener("DOMContentLoaded", function () {
    // Set up quantity controls for each menu item.
    const menuItems = document.querySelectorAll(".menu-item");
    const checkoutSection = document.getElementById("checkout-section");
    const checkoutBtn = document.getElementById("checkout-button");
  
    menuItems.forEach(item => {
      const plusBtn = item.querySelector(".plus");
      const minusBtn = item.querySelector(".minus");
      const quantityEl = item.querySelector(".quantity");
  
      plusBtn.addEventListener("click", () => {
        quantityEl.textContent = parseInt(quantityEl.textContent) + 1;
      });
  
      minusBtn.addEventListener("click", () => {
        const current = parseInt(quantityEl.textContent);
        if (current > 0) quantityEl.textContent = current - 1;
      });
    });
  
    // On checkout, gather selected items and display the bill.
    checkoutBtn.addEventListener("click", () => {
      let billHTML = `
        <div class="bill-header">
          <img src="logo.png" alt="Logo" class="bill-logo" style="height:60px; margin-bottom:10px;"/>
          <h2>Plateful & Platter</h2>
        </div>
        <h3>Bill Details:</h3>
      `;
      let total = 0;
      let itemAdded = false;
  
      menuItems.forEach(item => {
        const quantity = parseInt(item.querySelector(".quantity").textContent);
        if (quantity > 0) {
          itemAdded = true;
          const name = item.dataset.name;
          const price = parseInt(item.dataset.price);
          const itemTotal = price * quantity;
          total += itemTotal;
          billHTML += `<p>${name} x ${quantity} = ₹${itemTotal}</p>`;
        }
      });
  
      if (!itemAdded) {
        billHTML += "<p>No items selected.</p>";
      } else {
        billHTML += `<h3>Total Amount: ₹${total}</h3>`;
        billHTML += `<p>Please pay this amount.</p>`;
      }
      
      checkoutSection.innerHTML = billHTML;
    });
  });
  