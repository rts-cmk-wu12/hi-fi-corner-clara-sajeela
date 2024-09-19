document.addEventListener('DOMContentLoaded', () => {
    let categories = []; // To store categories

    // Fetch the categories data
    fetch('categories.json')
        .then(response => response.json())
        .then(data => {
            categories = data.technology_categories; 
            setupSearch();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    function setupSearch() {
        const searchButton = document.getElementById('search-button');

        searchButton.addEventListener('click', () => {
            const query = document.getElementById('search-input').value.toLowerCase();
            const filteredCategories = categories.filter(category =>
                category.category.toLowerCase().includes(query)
            );

            if (filteredCategories.length > 0) {
                // Redirect to the results page with the category data
                const queryString = encodeURIComponent(JSON.stringify(filteredCategories));
                window.location.href = `category-list.html?categories=${queryString}`;
            } else {
                alert('No categories found.');
            }
        });

        // Enter
        document.getElementById('search-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriesJSON = urlParams.get('categories');

    if (!categoriesJSON) {
        document.getElementById('category-title').textContent = 'No categories found';
        return;
    }

    const categories = JSON.parse(decodeURIComponent(categoriesJSON));

    displayCategories(categories);
});


function displayCategories(categories) {
    const container = document.getElementById('search-results');

    if (categories.length === 0) {
        container.innerHTML = '<p>No categories found.</p>';
        return;
    }

    categories.forEach(category => {
        // Create category heading
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = category.category;
        container.appendChild(categoryHeading);

        // Create a wrapper for the category content
        const categoryWrapper = document.createElement('div');
        categoryWrapper.classList.add('category-wrapper');

        // Add items to the category wrapper
        category.descriptors.forEach(descriptor => {
            // Create box for each item
            const itemBox = document.createElement('div');
            itemBox.classList.add('item-box');
            itemBox.innerHTML = `
                <img src="${descriptor.image}" alt="${descriptor.type} image">
                <p>Brand: ${descriptor.brand}</p>
                <p>Model: ${descriptor.model}</p>
                <p>Year: ${descriptor.year}</p>
                <p>Features: ${descriptor.features.join(', ')}</p>
                <h3>${descriptor.price}</h3>
                <button class="add-to-cart-button" onclick="addToCart(${descriptor.id})">View Product</button>
            `;

            // Append the item to the category wrapper
            categoryWrapper.appendChild(itemBox);
        });

        // Append category wrapper to the container
        container.appendChild(categoryWrapper);
    });
}



