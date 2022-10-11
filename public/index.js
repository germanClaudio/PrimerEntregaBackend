// const express = require('express')
// const app = express()
// const router = require('./modulos/rutas')

// const { Server: IOServer } = require('socket.io')
// const { Server: HttpServer } = require('http')

// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

// const io = require('socket.io')
// const socket = io.connect()

// // httpServer.listen(PORT, () => {
// //         console.log(`SERVER listen on port ${PORT}`)
// //     })
    
// // ----------  Messages ----------------
// socket.on('mensajesAll', (data) => {
//     //console.log('Data mensaje: ' + data)
//     // socket.emit('respuesta', { socketID: data.id, mensaje: data } )
//     render(data)
// })

// const addMessage = () => {
//     const user = document.getElementById('author').value
//     const message = document.getElementById('texto').value
//     const today = new Date()
//     const date = today.toLocaleString('en-GB')
//     // console.log(text, author, date)
//     socket.emit('newMensaje', { user, message, date })

//     return false
// }

// const render = (data) => {
//     //console.log('render..... ' + JSON.parse(data))
//     const array = JSON.parse(data)

//     const html = array.map((element) => {
//         // console.log('Dentro del html '+data)
//         return (`<div class="d-block mx-auto my-1 p-1">
//                     <strong class="text-secondary">Msg#${element.id_message} -> </strong>
//                     <strong class="fw-bold text-primary">${element.user}</strong>:
//                     <e id="colorBrown" style="color:brown;">${element.date} </e>: 
//                     <em id="colorGreen" style="color:MediumSeaGreen;">${element.message}</em>
//                </div>`)
//     }).join(" ")

//     document.getElementById('mostrarMensajes').innerHTML = html

//     // document.getElementById('author').value = ""
//     document.getElementById('texto').value = ""
// }


// // --------------  Products ----------------
// socket.on('productsAll', (arrProd) => {
//     // socket.emit('respuesta', { socketID: data.id, mensaje: data } )
//     renderProduct(arrProd)
// })

// const addProduct = () => {
//     const title = document.getElementById('title').value
//     const price = Number(document.getElementById('price').value)
//     const thumbnail = document.getElementById('thumbnail').value
//     //console.log(title, price, thumbnail)
//     socket.emit('newProducto', { title, price, thumbnail })

//     return false
// }

// const renderProduct = (arrProd) => {
//     // console.log('render..... ' + JSON.parse(producto))
//     const arrayProd = JSON.parse(arrProd)

//     const html = arrayProd.map((element) => {
//         // console.log('Dentro del html '+data)
//         return (`<tr>
//                     <th scope="row" class="text-center"><strong>${element.id}</strong></th>
//                     <td class="text-center">${element.timestamp}</td>
//                     <td class="text-center">$${element.price}</td>
//                     <td class="text-center"><img class="img-fluid rounded" alt="Product Image" src='${element.picture}' width="100" height="80"></td>
//                     <td class="text-center">${element.picture}</td>
//                 </tr>`)
//     }).join(" ");

//     document.getElementById('mostrarProductos').innerHTML = html

//     const htmlProdList = 
//         ( `<caption id="capProdList">Total Product List ${arrayProd.length}</caption>`)

//     document.getElementById('capProdList').innerHTML = htmlProdList    

//     document.getElementById('title').value = ""
//     document.getElementById('price').value = ""
//     document.getElementById('thumbnail').value = ""
// }

// router.get('/', (req, res) => {
//     // console.log('GET ALL.' + req.params.id)
//     res.send( 'index' , { getAllProducts } )
//     //res.json(getAllProducts)
    
// })

// const ContainerProducts = require('../containerProducts')
// const containerProduct = new ContainerProducts("./productos.json")
// const getAllProducts = containerProduct.getAllProd()


// let verProductos = document.getElementById('btnVerProductos');
// verProductos.addEventListener('click', buscarDestinos);
// console.log('btn presionado')
	
// 	function buscarDestinos() {
// 		let url = '../productos.json'

// 		fetch(url)
// 			.then(response => response.json(getAllProducts))
//             .then(data => mostrarData(data))
// 			.catch(error => console.log(error))

// 		const mostrarData = (data) => {
			
// 			function delay (ms) {
// 				return new Promise((resolve) => setTimeout(resolve,ms));
// 			}
// 			/*------------------- Simula conexión lenta a Servidor -------------------------*/
// 			async function simulacion () {
// 				let body = "";

// 				for (let i = 0; i <= data.length; i++){
// 					let serverTime = Math.random()*400;
// 					await delay(serverTime);
										
// 					if (i < data.length){
// 						body += `<tr><td>${data[i].id}</td>
// 											<td>${data[i].name}</td>
// 											<td>${data[i].description}</td>
// 											<td>${data[i].price}</td>
// 											<td>${data[i].picture}</td>
// 										</tr>`;
				
// 			 			document.getElementById('mostrarProductos').innerHTML = body;

// 					} else if (i === data.length) {
						
// 						body += `<tr>
// 			 							<td scope="col" colspan="6" class="text-center">
// 			 								<i class="fa fa-info-circle" aria-hidden="true"></i>
// 			 									---------------------- Fin de Tabla ----------------------- 
// 			 								<i class="fa fa-info-circle" aria-hidden="true"></i>
// 			 							</td> 
// 			 						  </tr>`;
// 						document.getElementById('mostrarProductos').innerHTML = body;;
// 					} 
// 				}
				
// 			}
			
// 			simulacion();
	
				// let cantidadCentros = document.getElementById('cantidadCentros');
				// let cantidadItemsCentros = data.length;
				
				// cantidadCentros.innerHTML = `Cantidad de Centros: <span class="badge rounded-pill bg-dark">${cantidadItemsCentros}</span>`;

				// verCentrosDistribucion.disabled = true;
				// verCentrosDistribucion.style.opacity = (0.4);

                // setTimeout(btnVolverFocus, 10000);
				
                // function btnVolverFocus(){
				// 	document.getElementById('btnVolver').focus();
				// }
		// }