export function init() {
    const cartItemsElem = document.getElementById('cart-items');
    const totalSumElem = document.getElementById('total-sum');

    function calculateTotalSum() {
        const totalSum = window.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        if (totalSumElem) {
            totalSumElem.textContent = `Viso: ${totalSum.toFixed(2)} €`;
        }
    }

    function renderCartItems() {
        if (cartItemsElem) {
            if (window.cart.length === 0) {
                cartItemsElem.innerHTML = '<p>No items added</p>';
            } else {
                cartItemsElem.innerHTML = '';
                window.cart.forEach(product => {
                    const itemElem = document.createElement('div');
                    itemElem.classList.add('card', 'mb-3');
                    itemElem.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Produkto kaina: ${product.price.toFixed(2)} €</p>
                            <div class="quantity-controls">
                            <p class="card-text">
                            Kiekis: 
                            <button class="btn btn-sm btn-secondary" data-action="decrease" data-id="${product.id}">-</button>
                            ${product.quantity}
                            <button class="btn btn-sm btn-secondary" data-action="increase" data-id="${product.id}">+</button>
                            </p>                                                            
                            </div>
                            <p class="card-text">Bendra suma: ${(product.price * product.quantity).toFixed(2)} €</p>
                        </div>
                    `;
                    cartItemsElem.appendChild(itemElem);
                });

                // Add event listeners for quantity controls
                const quantityControls = document.querySelectorAll('.quantity-controls button');
                quantityControls.forEach(button => {
                    button.addEventListener('click', function () {
                        const action = this.getAttribute('data-action');
                        const id = this.getAttribute('data-id');
                        let quantity = window.cart.find(item => item.id === id).quantity;

                        if (action === 'increase') {
                            quantity += 1;
                        } else if (action === 'decrease' && quantity > 0) {
                            quantity -= 1;
                        }

                        window.updateCartItem(id, quantity);
                        renderCartItems();
                        calculateTotalSum();
                    });
                });
            }
        }
        calculateTotalSum();
    }

    renderCartItems();
}