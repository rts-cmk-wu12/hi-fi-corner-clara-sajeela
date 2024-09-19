document.addEventListener('DOMContentLoaded', () => {
    // Get the productId from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (!productId) {
        document.getElementById('product-title').textContent = 'Product not found';
        return;
    }

    // Fetch the categories JSON data
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            const product = findProductById(data.technology_categories, productId);
            if (product) {
                displayProductDetails(product);
            } else {
                document.getElementById('product-title').textContent = 'Product not found';
            }
        })
        .catch(error => console.error('Error fetching product data:', error));
});

// Helper function to find the product by ID
function findProductById(categories, id) {
    for (const category of categories) {
        for (const descriptor of category.descriptors) {
            if (descriptor.id === parseInt(id)) {
                return descriptor;
            }
        }
    }
    return null;
}

// Display the product details on the page
function displayProductDetails(product) {
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <img src="${product.image}" alt="${product.model} image">
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Model:</strong> ${product.model}</p>
        <p><strong>Year:</strong> ${product.year}</p>
        <p><strong>Features:</strong> ${product.features.join(', ')}</p>
        <h3>Price: ${product.price}</h3>
        <button class="add-to-cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Add functionality for adding to cart here
}
