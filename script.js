//  header hamburger functionality
 (function(){
    const burgerCheckbox = document.getElementById('burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.getElementById('closeMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');

    if (!mobileMenu) return; 

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.classList.add('no-scroll');
      if (burgerCheckbox) burgerCheckbox.checked = true;
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (burgerCheckbox) burgerCheckbox.checked = false;
    }

    if (burgerCheckbox) {
      burgerCheckbox.addEventListener('change', () => {
        if (burgerCheckbox.checked) openMenu();
        else closeMenu();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(a => a.addEventListener('click', closeMenu));

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  })();

// add categories
const categoryContainer = document.querySelector('.categories-container')

async function getCategories() {
    let res = await fetch(`https://openapi.programming-hero.com/api/categories`)
    let data = await res.json()
    let categories = data.categories
    console.log(categories)
    categories.forEach((categoryObj)=>{
        //create a category item div
        let categoryItem = document.createElement('div')
        categoryItem.classList.add('category-item')
        categoryItem.innerHTML = categoryObj.category_name

        categoryContainer.appendChild(categoryItem)
    })
}
getCategories()