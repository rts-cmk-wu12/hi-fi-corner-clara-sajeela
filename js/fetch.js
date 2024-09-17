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
        <h3>${descriptor.type}</h3>
        <p>Brand: ${descriptor.brand}</p>
        <p>Model: ${descriptor.model}</p>
        <p>Year: ${descriptor.year}</p>
        <p>Features: ${descriptor.features.join(', ')}</p>
      `;

      // Append the item to the category wrapper
      categoryWrapper.appendChild(itemBox);
    });

    // Append category wrapper to the container
    container.appendChild(categoryWrapper);
  });
}
