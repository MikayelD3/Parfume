function add(){
    
    let productName = document.getElementById('name').value
    let productPrice = document.getElementById('price').value
    let productImage = document.getElementById('image').files[0]['name']

    let id = 1

    if(localStorage.getItem(`id`) !== null){
        id = +localStorage.getItem(`id`) + 1
    }
    
    let product = {
        productId: id,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage
    }

    localStorage.setItem(`productAdmin_${id}`, JSON.stringify(product))
    localStorage.setItem(`id`,id)
    
    location.href = 'admin.html'
}