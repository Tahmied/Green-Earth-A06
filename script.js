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
const loaderCategory = document.querySelector('#category-loader')

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


// modal functionalities
const cardModal = document.querySelector('.card-detail-modal')
const overlay = document.getElementById('treeModal');

async function openModal(plantId) {
    cardModal.innerHTML = ''
    cardModal.innerHTML = `      
    <div id="tree-loader" class="loader">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
        </div>`
    document.body.classList.add('modal-open');
    overlay.classList.add('show');
    document.querySelector('.card-detail-modal').focus();
    let res = await fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
    let data = await res.json()
    
    
    cardModal.innerHTML = `
        <button class="modal-close-btn" id="closeModal" aria-label="Close">×</button>
            <h2 id="treeTitle" class="tree-name-modal">${data.plants.name}</h2>
            <img src="${data.plants.image}" alt="Mango Mishti" class="modal-tree-img">
            <div class="tree-details-modal">
              <p class="modal-detail"><strong>Category:</strong> ${data.plants.category}</p>
              <p class="modal-detail"><strong>Price:</strong> ৳${data.plants.price}</p>
              <p class="modal-detail"><strong>Description:</strong>${data.plants.description}</p>
            </div>
    `
    const closeBtn = document.getElementById('closeModal');
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

}

function closeModal() {
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// show all plants
const treeCardContainer = document.querySelector('.three-center-container')
const treeLoaderAnimation = document.querySelector('#tree-loader')
const cartContainer = document.querySelector('.myCart')
let totalCart =0;
let cartItems = []

function extractPriceNumber(priceText) {
  const digits = priceText.replace('৳', '');
  return parseInt(digits, 10) || 0;
}

function formatPrice(num) {
  return `৳${num}`;
}

function renderCart() {
  cartContainer.innerHTML = '';

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.value = item.value;

    cartItem.innerHTML = `
      <div class="cart-item-left">
        <p class="cart-item-title">${item.treeName}</p>
        <p class="cart-item-price">${formatPrice(item.priceNum)} x ${item.treeQant}</p>
      </div>
      <div class="cross-icon" role="button" aria-label="Remove item">
        <img src="./assets/cross.svg" alt="remove">
      </div>
    `;
    cartContainer.appendChild(cartItem);

    // add event listener only to that cart item cross-icon 
    const cross = cartItem.querySelector('.cross-icon');
    cross.addEventListener('click', () => {
      // reduce the quantity of that tree in the array
      const idx = cartItems.findIndex(ci => ci.value === item.value);
      if (idx === -1) return;

      // reduce the quantity of that cart item
      totalCart = Math.max(0, totalCart - cartItems[idx].priceNum);
      cartItems[idx].treeQant -= 1;

      // remove from array object if quantity reaches 0
      if (cartItems[idx].treeQant <= 0) {
        cartItems.splice(idx, 1);
      }
      renderCart(); 
    });
  });

  // update total number txt
  const totalPriceShow = document.querySelector('.total-price');
  if (totalPriceShow) {
    totalPriceShow.innerHTML = formatPrice(totalCart);
  } 
}

function addItemToCartFromCard(treeCard) {
  const id = treeCard.getAttribute('value');
  const treeName = treeCard.querySelector('.tree-title').innerText;
  const treePriceText = treeCard.querySelector('.tree-price').innerText || '';
  const priceNum = extractPriceNumber(treePriceText);

  totalCart += priceNum;

  const existing = cartItems.find(ci => ci.value === id);
  if (!existing) {
    cartItems.push({
      treeName,
      treePriceText, 
      priceNum,
      treeQant: 1,
      value: id
    });
  } else {
    existing.treeQant += 1;
  }
  renderCart();
}


function addToCart(treeCard){
    cartContainer.innerHTML = ''
    cartItems.forEach((cartItemArr)=>{
        let cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        cartItem.setAttribute('value',treeCard.getAttribute('value'))
        cartItem.innerHTML = `
            <div class="cart-item-left">
                <p class="cart-item-title">${cartItemArr.treeName}</p>
                <p class="cart-item-price">${cartItemArr.treePrice} x ${cartItemArr.treeQant}</p>
            </div>
            <div class="cross-icon">
                <img src="./assets/cross.svg" alt="">
            </div>
        `
        // append to cart container
        cartContainer.appendChild(cartItem)
        // cross button functionality ( remove from cart )
        const crossBtn = document.querySelectorAll('.cross-icon')
        crossBtn.forEach((cross)=>{
            let cartItemToRemove;
            cross.addEventListener('click',(e)=>{
                if(e.target.classList.contains('cross-icon')){
                    cartItemToRemove = e.target.parentElement
                } else {
                    cartItemToRemove = e.target.parentElement.parentElement
                }
                let cartItemInArrayToRemove = cartItems.find((item)=>{
                    return item.value == cartItemToRemove.getAttribute('value')
                })
                totalCart = totalCart-(parseInt(extractPriceNumber(cartItemInArrayToRemove.treePrice))*cartItemInArrayToRemove.treeQant)

                let index = cartItems.findIndex(
                  (item) => item.value === cartItemToRemove.getAttribute('value')
                )
                if (index !== -1) {
                  totalCart -= parseInt( extractPriceNumber(cartItems[index].treePrice)) * cartItems[index].treeQant;
                  cartItems.splice(index, 1);
                }
                const totalPriceShow = document.querySelector('.total-price')
                totalPriceShow.innerHTML = `৳${parseInt(totalCart)}`
                cartItemToRemove.remove();
                
            })
        })

        // update the price of the total 
        const totalPriceShow = document.querySelector('.total-price')
        totalPriceShow.innerHTML = `৳${parseInt(totalCart)}`
    })
}

async function showAllPlants() {
    let res = await fetch(`https://openapi.programming-hero.com/api/plants`)
    let receivedData = await res.json()
    receivedData.plants.forEach((plantObj)=>{
        let treeCard = document.createElement('div')
        treeCard.classList.add('tree-card')
        treeCard.setAttribute('value', plantObj.id)
        treeCard.innerHTML = `
            <img loading="lazy" src="${plantObj.image}" alt="" class="card-image">
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
    treeLoaderAnimation.style.display = 'none'
    let treeCards = document.querySelectorAll('.tree-card')

    // add to cart functionality
    treeCards.forEach((treeCard)=>{
        treeCard.addEventListener('click' , async (e)=>{
            if(!e.target.classList.contains('add-card')){
                await openModal(treeCard.getAttribute('value'))
            } else {
                addItemToCartFromCard(treeCard)
            }
        })
    })
}
showAllPlants()
