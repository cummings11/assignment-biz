// Login validation
const username = "user";
const password = "password123";
let attempts = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    if (inputUsername === username && inputPassword === password) {
        window.location.href = 'products1.html';
    } else {
        attempts++;
        if (attempts >= 3) {
            window.location.href = 'error.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Invalid login. Please try again.';
        }
    }
});

// Product selection and invoice calculation
let selectedProducts = [];

document.getElementById('checkoutBtn').addEventListener('click', function() {
    const products = document.querySelectorAll('.product-checkbox'); // Correctly select checkboxes for products
    selectedProducts = [];

    products.forEach(product => {
        if (product.checked) {
            selectedProducts.push({
                name: product.getAttribute('data-name'),
                price: parseFloat(product.getAttribute('data-price'))
            });
        }
    });

    if (selectedProducts.length > 0) {
        // Store the selected products in localStorage
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

        // Redirect to the invoice page
        window.location.href = 'invoice.html';
    } else {
        alert('Please select at least one product to proceed.');
    }
});

// Display invoice details on the invoice page
if (window.location.pathname.includes('invoice.html')) {
    const invoiceContainer = document.getElementById('invoiceDetails');
    const products = JSON.parse(localStorage.getItem('selectedProducts'));

    if (products && products.length > 0) {
        let subtotal = 0;
        products.forEach(product => {
            subtotal += product.price;
            const productDetail = document.createElement('p');
            productDetail.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            invoiceContainer.appendChild(productDetail);
        });

        const tax = subtotal * 0.15;
        const total = subtotal + tax;

        invoiceContainer.innerHTML += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
        invoiceContainer.innerHTML += `<p>Tax (15%): $${tax.toFixed(2)}</p>`;
        invoiceContainer.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
    } else {
        invoiceContainer.innerHTML = '<p>No products selected.</p>';
    }
}
