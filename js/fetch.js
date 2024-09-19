document.addEventListener('DOMContentLoaded', () => {
    // Read category from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    if (!categoryName) {
        document.getElementById('category-title').textContent = 'Category not specified';
        return;
    }

    // Fetch categories JSON
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            // Filter and display only the category that matches the URL parameter
            const matchedCategory = data.technology_categories.find(cat => cat.category.toLowerCase() === categoryName.toLowerCase());
            
            if (matchedCategory) {
                displayCategoryItems(matchedCategory);
            } else {
                document.getElementById('category-title').textContent = 'Category not found';
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function displayCategoryItems(category) {
    const container = document.getElementById('content-container');
    
    // Create category heading
    const categoryHeading = document.createElement('h2');
    categoryHeading.textContent = category.category;
    container.appendChild(categoryHeading);

    // Create a wrapper for the category content
    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('category-wrapper');

    // Add items to the category wrapper
    category.descriptors.forEach(descriptor => {
        const itemBox = document.createElement('div');
        itemBox.classList.add('item-box');
        itemBox.innerHTML = `
            <img src="${descriptor.image}" alt="${descriptor.model} image">
            <p>Brand: ${descriptor.brand}</p>
            <p>Model: ${descriptor.model}</p>
            <p>Year: ${descriptor.year}</p>
            <p>Features: ${descriptor.features.join(', ')}</p>
            <h3>${descriptor.price}</h3>
            <button class="add-to-cart-button" onclick="addToCart(${descriptor.id})">Add to cart</button>
        `;
    
        categoryWrapper.appendChild(itemBox);
    });
    

    container.appendChild(categoryWrapper);
}

function addToCart(productId) {
    console.log(`Product ${productId} clicked`);
    // Redirect to single-product.html with the product ID as a query parameter
    window.location.href = `single-product.html?productId=${productId}`;
}



