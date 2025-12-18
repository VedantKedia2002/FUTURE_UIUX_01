// script.js
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    const orderItemsContainer = document.getElementById('order-items');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderButton = document.getElementById('place-order');

    let order = [];
    let totalPrice = 0;

    // Filter menu items by category
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add item to order
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const name = item.querySelector('h3').textContent;
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));

            order.push({ name, price });
            totalPrice += price;
            updateOrderDisplay();
        });
    });

    // Update order display
    function updateOrderDisplay() {
        orderItemsContainer.innerHTML = '';
        order.forEach((item, index) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Add remove functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                totalPrice -= order[index].price;
                order.splice(index, 1);
                updateOrderDisplay();
            });
        });
    }

    // Place order
    placeOrderButton.addEventListener('click', function() {
        if (order.length === 0) {
            alert('Your order is empty!');
            return;
        }
        const orderType = document.querySelector('input[name="order-type"]:checked').value;
        alert(`Order placed for ${orderType}! Total: $${totalPrice.toFixed(2)}`);
        // Reset order
        order = [];
        totalPrice = 0;
        updateOrderDisplay();
    });
});