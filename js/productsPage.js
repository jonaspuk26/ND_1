export function init() {
    const toggleButtons = document.querySelectorAll('.custom-dropdown-toggle');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dropdownContent = button.closest('tr').nextElementSibling;
            dropdownContent.classList.toggle('active');
            button.classList.toggle('active');
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.closest('table').querySelector('tr:nth-child(2) td').textContent,
                price: parseFloat(this.closest('table').querySelector('tr:nth-child(3) td:nth-child(2)').textContent.replace(',', '.'))
            };
            window.addToCart(product);
        });
    });
}
