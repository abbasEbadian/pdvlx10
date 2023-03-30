const products = [
  {
    id: 1,
    name: 'iPhone 12',
    price: 99,
    image: './images/iphone-12.png',
  },
  {
    id: 2,
    name: 'AirPods',
    price: 89,
    image: './images/airpods.png',
  },
  {
    id: 3,
    name: 'تبلت 12 اینچی',
    price: 7800,
    image: './images/iphone-12.png',
  },
  {
    id: 4,
    name: 'پاوربانک 10000میلی آمپر',
    price: 9200,
    image: './images/airpods.png',
  },
]

let cart = {
  items: [],
  total: 0,
}

const init = () => {
  const _cart = localStorage.getItem("cart")
  if(!_cart) return
  cart = JSON.parse(_cart);
}
init()

const updateLocalStorage = ( data ) => {
  localStorage.setItem("cart", JSON.stringify(data))
} 

//localStorage.clear()


const renderProducts = () => {
  const productDiv = document.querySelector('.products')
  productDiv.innerHTML = ''

  products.forEach((item, index) => {
    productDiv.innerHTML += `
    <div class="product">
    <div class="product__image">
      <img src=${item.image} />
    </div>
    <h2 class="product__title">${item.name}</h2>
    <h3 class="product__price">${item.price} تومان</h3>
    <button class="add-to-cart" onclick="addToCart(${index})">افزودن به سبد خرید</button>
  </div>
    `
  })
}

const renderCartItems = () => {

  const cartDiv = document.querySelector('.cart__items')
  cartDiv.innerHTML = ''

  const totalPriceEl = document.querySelector('.cart__total-price')

  let totalPrice = 0

  if (cart.items.length === 0) {
    cartDiv.innerHTML = 'محصولی در سبد خرید وجود ندارد'
  }

  cart.items.forEach((item) => {
    totalPrice += item.total

    cartDiv.innerHTML += `
     <div class="cart__item">
		<div class="col-md-4">
		  <button class="cart__item-remove" onclick="removeFromCart('${item.name}')">حذف</button>
		  <button class="cart__item-remove" onclick="plusProduct('${item.name}')">+</button>
		  <button class="cart__item-remove" onclick="minusProduct('${item.name}')">-</button>	  
		</div>
		<div class="col-md-1">
		  <div class="qty">${item.qty}</div>
		</div>
		<div class="col-md-4">
		  <h3 class="cart__item-title">${item.name}</h3>
		</div>
		<div class="col-md-3">
			<div class="product__image">
			  <img src=${item.image} />
			</div>
		</div>	
	  </div> 
    `
  })

  totalPriceEl.innerHTML = `مجموع: ${totalPrice} تومان`

}

const addToCart = (productIndex) => {

  const product = products[productIndex]
  let existingProduct = false

  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === product.name) {
      existingProduct = true

      const newItem = {
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price,
      }

      return [...state, newItem]
    }

    return [...state, item]
  }, [])

  if (!existingProduct) {
    newCartItems.push({
      ...product,
      qty: 1,
      total: product.price,
    })
  }

  cart = {
    ...cart,
    items: newCartItems,
  }

  updateLocalStorage(cart);
  renderCartItems()
}

const plusProduct = (productName) => {
  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === productName) {
      const newItem = {
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price,
      }

      if (newItem.qty > 0) {	  
        return [...state, newItem]
      } else {
        return state
      }
    }

    return [...state, item]
  }, [])

  cart = {
    ...cart,
    items: newCartItems,
  }

  updateLocalStorage(cart);
  renderCartItems()
}

const minusProduct = (productName) => {
  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === productName) {
      const newItem = {
        ...item,
        qty: item.qty - 1,
        total: (item.qty - 1) * item.price,
      }

      if (newItem.qty > 0) {		  
        return [...state, newItem]
      } else {
        return state
      }
    }

    return [...state, item]
  }, [])

  cart = {
    ...cart,
    items: newCartItems,
  }

  updateLocalStorage(cart);
  renderCartItems()
}



const removeFromCart = (productName) => {
  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === productName) {
      const newItem = 0
      if (newItem.qty > 0) {		  
        return [...state, newItem]
      } else {
        return state
      }
    }

    return [...state, item]
  }, [])

  cart = {
    ...cart,
    items: newCartItems,
  }

  updateLocalStorage(cart);
  renderCartItems()
}

const clearBasket = (productName) => {
  cart.items.length =
  updateLocalStorage(cart);
  renderCartItems()
}



renderProducts()
renderCartItems()
