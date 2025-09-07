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
const loaderCategory = document.querySelector('.loader')

async function getCategories() {
    let res = await fetch(`https://openapi.programming-hero.com/api/categories`)
    let data = await res.json()
    let categories = data.categories
    categories.forEach((categoryObj)=>{
        //create a category item div
        let categoryItem = document.createElement('div')
        categoryItem.classList.add('category-item')
        categoryItem.innerHTML = categoryObj.category_name

        categoryContainer.appendChild(categoryItem)
    })
    loaderCategory.style.display = 'none'
}
getCategories()

// show all plants
const treeCardContainer = document.querySelector('.three-center')

async function showAllPlants() {
    let res = await fetch(`https://openapi.programming-hero.com/api/plants`)
    let receivedData = await res.json()
    console.log(receivedData)
    receivedData.plants.forEach((plantObj)=>{
        console.log(plantObj)
        //
        let treeCard = document.createElement('div')
        treeCard.classList.add('tree-card')
        treeCard.innerHTML = `
            <img src="${plantObj.image}" alt="" class="card-image">
                <div class="card-details">
                    <p class="tree-title">${plantObj.name}</p>
                    <p class="tree-descrition">${plantObj.description}</p>
                    <div class="tree-catp">
                        <div class="tree-category">${plantObj.category}</div>
                        <p class="tree-price">৳${plantObj.price}</p>
                    </div>
                    <button value="${plantObj.id}" class="add-card">Add to Cart</button>
                </div>
        `
    treeCardContainer.appendChild(treeCard)
    })


}
showAllPlants()