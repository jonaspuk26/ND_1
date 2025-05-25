export function init() {
    const form = document.getElementById('checkout-form');
    const totalSumElem = document.getElementById('total-sum');
    const submitButton = document.getElementById('submit-button');

    function updateTotalSum() {
        const totalSum = window.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        if (totalSumElem) {
            totalSumElem.textContent = `Užsakymo suma: ${totalSum.toFixed(2)} €`;
        }
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const isChecked = document.getElementById('pickup').checked;

        if (name && surname && email && isChecked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    if (form) {
        form.addEventListener('input', validateForm);
        form.addEventListener('change', validateForm);
    }

    updateTotalSum();
    validateForm();

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const order = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            items: window.cart, // assuming your cart has productId, name, price, quantity
            orderAmount: window.cart.reduce((total, product) => total + (product.price * product.quantity), 0)
        };

        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });

        const data = await res.json();
        console.log('Order submitted:', data);
        console.log('Order amount:', window.cart.reduce((total, product) => total + (product.price * product.quantity), 0));
    });

}
