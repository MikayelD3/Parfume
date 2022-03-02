let cartBox = document.getElementById('cartBox')
let totalBox = document.getElementById('totalBox')

function showCart(){
    cartBox.classList.toggle('cartBoxShow')
}

function showProducts() {
    let id = localStorage.getItem('id')
    let items = document.getElementById('items')

    for (let i = 1; i <= id; i++) {
        let product = JSON.parse(localStorage.getItem(`productAdmin_${i}`))

        if (product != null) {
            items.innerHTML += `
            <div class="item">
                <div class="item-img">
                    <img src="./img/${product.productImage}" alt="img">
                </div>
                <div class="item-info">
                    <p>${product.productName}</p>
                    <a href="#" class="add" onclick="add(${product.productId},this)">Add to card</a>
                    <p id="itemPrice"><span>${product.productPrice}</span> $</p>
                </div>
            </div>
            `
        }
    }
}

function add(id, item){

    let name = item.previousElementSibling.innerText
    let price = item.nextElementSibling.firstElementChild.innerText
    let image = item.parentElement.previousElementSibling.firstElementChild.getAttribute("src")

    let count = 1

    if(localStorage.getItem(`product_${id}`) != null){
        let oldProduct = JSON.parse(localStorage.getItem(`product_${id}`))

        oldProduct.productCount++
        oldProduct.productPrice = price * oldProduct.productCount

        localStorage.setItem(`product_${id}`, JSON.stringify(oldProduct))
    }else{
        let product = {
            productId: id,
            productName: name,
            productPrice: price,
            productImage: image,
            productCount: count
        }
    
        localStorage.setItem(`product_${id}`, JSON.stringify(product))
    }

    show()
}

function show(){
    let cartItems = document.getElementById('cartItems')
    cartItems.innerHTML = ''
    totalBox.innerHTML = `Cart is empty`
    let total = 0
    
    for(let i = 1; i <= 4; i++){
        let product = JSON.parse(localStorage.getItem(`product_${i}`))

        if(product != null){

            total += +product.productPrice
            totalBox.innerHTML = `Total: ${total} $`

            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${product.productImage}" alt="img">
                    </div>
                    <div class="cart-item-info">
                        <p>${product.productName}</p>
                        <p>${product.productPrice} $</p>
                    </div>
                    <i class="fa fa-times" onclick="remove(${product.productId})"></i>
                    <span>x${product.productCount}</span>
                
                    <div class="myBtns">
                        <button onclick ="minus(${i})">-</button>
                        <button onclick ="plus(${i})">+</button>
                    </div>
                </div>
            `
        }
    }
}

function minus(id) {

    let product = JSON.parse(localStorage.getItem(`product_${id}`))
    let adminProduct = JSON.parse(localStorage.getItem(`productAdmin_${id}`))
    
    product.productCount--

    product.productPrice = adminProduct.productPrice * product.productCount

    if (product.productCount === 0) return

    localStorage.setItem(`product_${id}`, JSON.stringify(product))

    show()
}

function plus(id) {
    let product = JSON.parse(localStorage.getItem(`product_${id}`))
    let adminProduct = JSON.parse(localStorage.getItem(`productAdmin_${id}`))

    product.productCount++
    product.productPrice = adminProduct.productPrice * product.productCount

    localStorage.setItem(`product_${id}`, JSON.stringify(product))

    show()
}

function remove(id){
    localStorage.removeItem(`product_${id}`)
    show()
}

show()
showProducts()