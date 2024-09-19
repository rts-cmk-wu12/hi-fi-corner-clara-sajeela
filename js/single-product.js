document.addEventListener('DOMContentLoaded', () => {
    // Read productId from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (!productId) {
        document.getElementById('product-title').textContent = 'Product not specified';
        return;
    }

    fetch('categories.json')
        .then(response => response.json())
        .then(data => displayProduct(data.technology_categories, productId))
        .catch(error => console.error('Error fetching JSON:', error));
});

function displayProduct(categories, productId) {
    const productTitle = document.getElementById('product-title');
    const productContainer = document.getElementById('product-container');
    const productImage = document.getElementById('product-image'); // Reference the img element
    
    // Find the product in the categories
    let product = null;
    for (const category of categories) {
        product = category.descriptors.find(descriptor => descriptor.id == productId);
        if (product) break;
    }

    if (product) {
        // Product title
        productTitle.textContent = `${product.brand} ${product.model}`;

        // Product image
        
        productImage.src = product.image; // Matches the path in json
        productImage.alt = `${product.brand} ${product.model} image`;

        // Product details
        productContainer.innerHTML = `
            <p>Brand: ${product.brand}</p>
            <p>Model: ${product.model}</p>
            <p>Year: ${product.year}</p>
            <p>Features: ${product.features.join(', ')}</p>
            <h3>${product.price}</h3>
        `;
    } else {
        productTitle.textContent = 'Product not found';
        productContainer.innerHTML = '';
        productImage.src = ''; // Clear src if not found
        productImage.alt = '';
    }
}

