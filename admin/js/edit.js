let hash = location.hash
let id = hash.slice(1)

function edit(){
    let editedProduct = JSON.parse(localStorage.getItem(`productAdmin_${id}`))
    let productName = document.getElementById('name')
     
    let productPrice = document.getElementById('price')
    let productImage = document.getElementById('image')
    productName.value = editedProduct[`productName`]
    productPrice.value = editedProduct[`productPrice`]
    productImage.value = editedProduct[`productImage`]
    localStorage.removeItem(`productAdmin_${id}`)
}
edit()