document.addEventListener('DOMContentLoaded', () => {
    // Get all the category links
    const categoryLinks = document.querySelectorAll('.thumbs__link');

    // Loop through each link and add an event listener
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior
            
            const category = this.getAttribute('data-category'); // Get the category from the data-category attribute
            
            // Redirect to category-list.html with the category as a query parameter
            window.location.href = `category-list.html?category=${category}`;
        });
    });
});

//get all categories
document.getElementById('shop-now-btn').addEventListener('click', function () {
    // Redirect to category-list.html 
    window.location.href = 'category-list.html?show=all';
});



