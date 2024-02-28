// Truy cap phan tu
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const cart = document.querySelector(".cart-btn");
const close = document.querySelector("#close-btn");

// TN1: Open-Close Popup
cart.addEventListener('click', () => {
  cartModalOverlay.style.transform = "translateX(0px)";
});
close.addEventListener('click', () => {
  cartModalOverlay.style.transform = "translateX(-200%)";
});
cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay') == true) {
    cartModalOverlay.style.transform = "translateX(-200%)";
  }
});

//TN2: Add cart product
const addToCart = document.querySelectorAll(".add-to-cart");
addToCart.forEach((item) => {
  item.addEventListener('click', () => {
    cartModalOverlay.style.transform = "translateX(0px)";
    addToCartClicked(item);
  });

});

// Funtion trung gian de lay gia tri thong tin them popup cart
const addToCartClicked = (item) => {
  //Cha cai nut button vua bam
  let carItem = item.parentElement;


  let price = carItem.querySelector('.product-price').innerHTML;
  let imageSrc = carItem.querySelector('.product-image').src;

  addItemToCart(price, imageSrc);
}


// Funtion them san pham vao trong popup
const addItemToCart = (price, imageSrc) => {
  const productRows = document.querySelector('.product-rows');

  // Tao ma HTML (DOM ao) them vao productRows
  let productRow = document.createElement('div');
  productRow.classList.add('product-row');

  // Them content hinh anh, gia sp, so luong vao trong no
  productRow.innerHTML = `
    <img class="cart-image" src="${imageSrc}" alt="">
    <span class ="cart-price">${price}</span>
    <input class="product-quantity" type="number" value="1">
    <button class="remove-btn">Remove</button>
  `;

  // Hien thi ra ngoai
  productRows.appendChild(productRow);

  removeProduct(); // xoa

  changeProductValue(); //Thay doi so luong

  updatePrice(); //cap nhat gia
}


// Delete Product Item add
const removeProduct = () => {
  let btnRemove = document.querySelectorAll(".remove-btn");
  btnRemove.forEach((item)=>{
    item.addEventListener('click',()=>{
      item.parentElement.remove();
      updatePrice();
    });
  });
}

// Thay doi so luong phan tu
const changeProductValue = () => {
  const inputQuality = document.querySelectorAll('.product-quantity');

  inputQuality.forEach((item)=>{
    item.addEventListener('change', ()=>{
      updatePrice();
    });

  });
}

// Update Price and count Product
const updatePrice = () => {
  const productRowEle = document.querySelectorAll('.product-row');

  let total = 0;
  productRowEle.forEach((item)=>{
    const priceEl = item.querySelector('.cart-price').innerHTML;
    const price = parseFloat(priceEl.replace('$', ' ')); 
    
    const quantity = item.querySelector('.product-quantity').value;

    total = total + (price * quantity)

    // Ghi ra popup
    document.querySelector('.total-price').innerHTML = total;
    document.querySelector('.cart-quantity').innerHTML = productRowEle.length;
  });
}

