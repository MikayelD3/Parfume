if(localStorage.getItem('admin') === null){
    location.href = 'login.html'
}

function show(){
    let id = localStorage.getItem(`id`)
    let count = 0
    let tbody = document.getElementsByTagName('tbody')[0]
    tbody.innerHTML = ""

    for(let i = 1; i <= id; i++){
        let product = JSON.parse(localStorage.getItem(`productAdmin_${i}`))
        
        if(product !== null){
        count++
        tbody.innerHTML += `
            <tr>
                <td> ${count} </td>
                <td> ${id} </td>
                <td> ${product.productName}</td>
                <td> ${product.productPrice} $</td>
                <td><img src="./img/${product.productImage}"></td>
                <td>
                    <div>
                        <a id="edit" href="edit.html#${i}" onclick="edit()">Edit</a>
                        <a id="delete" href="#" onclick="removeProduct(${i})">Delete</a>
                    </div>
                </td>
            </tr>
        `
    }
    }
}

function removeProduct(id){
    localStorage.removeItem(`productAdmin_${id}`)

    if(localStorage.length === 2){
        localStorage.removeItem(`id`)
    }

    show()
}

show()