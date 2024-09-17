fetch('categories.json')
  .then(response => response.json())
  .then(data => displayCategories(data.technology_categories))
  .catch(error => console.error('Error fetching JSON:', error));

function displayCategories(categories) {
  const container = document.getElementById('content-container');

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
      <button class="add-to-cart-button" onclick="addToCart(${descriptor.id})">Add to Cart</button>
      `;

      // Append the item to the category wrapper
      categoryWrapper.appendChild(itemBox);
    });

    // Append category wrapper to the container
    container.appendChild(categoryWrapper);
  });
}

function addToCart(productId) {
  console.log(`Product ${productId} added to cart`);
  window.location.href = '#.html'; //add specific product here
}
