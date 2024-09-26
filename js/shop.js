// For show all
document.addEventListener('DOMContentLoaded', () => {
   
    const loadDataBtn = document.getElementById('load-data-btn'); 
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', function () {
            // Redirect to category-list.html with the "show=all" parameter
            window.location.href = 'category-list.html?show=all';
        });
    } else {
        console.error("Shop Now button not found");
    }

    // For categories
    const categoryLinks = document.querySelectorAll('.thumbs__link');

 
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const category = this.getAttribute('data-category'); 
            
            window.location.href = `category-list.html?category=${category}`;
        });
    });
});
