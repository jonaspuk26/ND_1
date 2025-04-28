document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    switch (true) {
        case path.includes('produktai.html'):
            import('./productsPage.js').then(module => {
                module.init();
            });
            break;
        case path.includes('krepselis.html'):
            import('./cartPage.js').then(module => {
                module.init();
            });
            break;
        case path.includes('uzsakymas.html'):
            import('./orderPage.js').then(module => {
                module.init();
            });
            break;
        default:
            console.log('No specific script to load for this page.');
    }

    // Shared functionality
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElem = document.getElementById('cart-count');

    function updateCartCount() {
        if (cartCountElem) {
            cartCountElem.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
    }

    function updateCartItem(id, quantity) {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            if (quantity === 0) {
                const index = cart.indexOf(product);
                if (index > -1) {
                    cart.splice(index, 1);
                }
            }
            saveCart();
        }
    }

    function clearCart() {
        localStorage.removeItem('cart');
        cart.length = 0;
        updateCartCount();
    }

    // Clear cart only on browser reload
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries.length > 0 && perfEntries[0].type === "reload") {
        clearCart();
    }

    updateCartCount();

    // Expose functions to be used in other scripts
    window.addToCart = addToCart;
    window.updateCartItem = updateCartItem;
    window.cart = cart;
});
