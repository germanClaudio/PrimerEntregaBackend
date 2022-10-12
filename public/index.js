const socket = io.connect()

// --------------  Products ----------------
socket.on('productsAll', (arrProd) => {
    // socket.emit('respuesta', { socketID: data.id, mensaje: data } )
    renderProduct(arrProd)
})

const addProduct = () => {
	const today = new Date()
    const timestamp = today.toLocaleString('en-GB')
    const name = document.getElementById('name').value
	const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const picture = document.getElementById('picture').value
	const code = document.getElementById('code').value
	const stock = Number(document.getElementById('stock').value)
    
	console.log(name, price, picture)
    socket.emit('newProducto', { timestamp, name, description, price, picture, code, stock })

    return false
}

const renderProduct = (arrProd) => {
    const arrayProd = JSON.parse(arrProd)

    const html = arrayProd.map((element) => {
       return (`<div class="card shadow h-100 mx-3" style="max-width: 540px;">
					<div class="row g-0">
						<div class="col-md-4 my-auto">
							<img src='${element.picture}' class="img-fluid rounded-center"
								alt="Image Product">
						</div>
						<div class="col-md-8">
							<div class="card-body border-start border-dark">
								<h5 class="card-title">
									${element.name}
								</h5>
								<ul class="list-group">
									<li class="list-group-item border-0">Description: ${element.description}</li>
									<li class="list-group-item border-0">Price $<strong> ${element.price}</strong></li>
									<li class="list-group-item border-0">Code: <strong> ${element.code}</strong></li>   
								</ul>
								<p class="card-text"><small class="text-muted">Stock: ${element.stock}</small></p>
								<a href="/api/productos/${element.id}" class="btn btn-success btn-sm">See
									Product <i class="fa fa-eye"></i></a>
							</div>
						</div>
					</div>
				</div>`)
    }).join(" ");

    document.getElementById('mostrarProductos').innerHTML = html

    // document.getElementById('name').value = ""
    // document.getElementById('price').value = ""
    // document.getElementById('picure').value = ""
}

socket.on('deleteProduct', (ProductIdDeleted) => {
    // socket.emit('respuesta', { socketID: data.id, mensaje: data } )
    renderProduct(ProductIdDeleted)
})


const renderProductDeleted = (ProductIdDeleted) => {
    // console.log('render..... ' + JSON.parse(producto))
    const arrayProd = JSON.parse(ProductIdDeleted)

    const html = arrayProd.map((element) => {
        // console.log('Dentro del html '+data)
        return (`<tr>
                    <th scope="row" class="text-center"><strong>${element.id}</strong></th>
                    <td class="text-center">${element.title}</td>
                    <td class="text-center">$${element.price}</td>
                    <td class="text-center"><img class="img-fluid rounded" alt="Product Image" src='${element.thumbnail}' width="100" height="80"></td>
                    <td class="text-center">${element.thumbnail}</td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProductos').innerHTML = html

    const htmlProdList = 
        ( `<caption id="capProdList">Total Product List ${arrayProd.length}</caption>`)

    document.getElementById('capProdList').innerHTML = htmlProdList    

    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""
}