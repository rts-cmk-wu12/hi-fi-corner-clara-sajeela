document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');
    const showAll = urlParams.get('show');

    // If "show=all" param is present, show all categories
    if (showAll === 'all') {
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                displayAllCategories(data.technology_categories);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    } 
    // If a category is in the URL, display that category
    else if (categoryName) {
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                const matchedCategory = data.technology_categories.find(cat => cat.category.toLowerCase() === categoryName.toLowerCase());
                if (matchedCategory) {
                    displayCategoryItems(matchedCategory);
                } else {
                    document.getElementById('category-title').textContent = 'Category not found';
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));
    } 
});

// Function to show categories
function displayAllCategories(categories) {
    const container = document.getElementById('content-container');
    container.innerHTML = ''; // Clear container

    categories.forEach(category => {
        // Heading for each category
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = category.category;
        container.appendChild(categoryHeading);

        // Wrapper for the category items
        const categoryWrapper = document.createElement('div');
        categoryWrapper.classList.add('category-wrapper');


        // Display all items in the category
        category.descriptors.forEach(descriptor => {
            const itemBox = document.createElement('div');
            itemBox.classList.add('item-box');
            itemBox.innerHTML = `
                <img src="${descriptor.image}" alt="${descriptor.model} image">
                <p>Brand: ${descriptor.brand}</p>
                <p>Model: ${descriptor.model}</p>
                <p>Year: ${descriptor.year}</p>
                <p>Features: ${descriptor.features.join(', ')}</p>
                <button class="add-to-cart-button" onclick="addToCart(${descriptor.id})">Add to cart</button>
            `;

            // Appends itemBox to categoryWrapper
            categoryWrapper.appendChild(itemBox);

        });

        container.appendChild(categoryWrapper);
    });
}


// Specific category
function displayCategoryItems(category) {
    const container = document.getElementById('content-container');
    
    // Clears previous content
    container.innerHTML = ''; 

    // Heading for the category
    const categoryHeading = document.createElement('h2');
    categoryHeading.textContent = category.category;
    container.appendChild(categoryHeading);

    // Wrapper for the items in this category
    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('category-wrapper');

    // Display all items
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
          <button class="add-to-cart-button" onclick="addToCart(${descriptor.id})">View Product</button>
        `;
        categoryWrapper.appendChild(itemBox);
    });

    container.appendChild(categoryWrapper);
}

function addToCart(productId) {
    console.log(`Product ${productId} selected`);
    window.location.href = `single-product.html?productId=${productId}`;
}


