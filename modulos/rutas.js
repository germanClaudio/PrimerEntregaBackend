const express = require('express')
const { Router } = express
const router = Router()
const app = express()

// const { Server: IOServer } = require('socket.io')
// const { Server: HttpServer } = require('http')
// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------- Productos ----------------
const ContainerProducts = require('../containerProducts')
const containerProduct = new ContainerProducts("./productos.json")
const getAllProducts = containerProduct.getAllProd()

const admin = true  // change to false to simulate user, change to true to simulate admin

//--------Router GET ALL ---------

router.get('/', (req, res) => {
    //res.send( 'index' , { getAllProducts } )
    res.setHeader('Content-Type', 'text/html')
    res.render('index', { getAllProducts, admin } )
    //res.json(getAllProducts)
    
})

//--------Router GET BY ID ---------
router.get('/:id', (req, res) => {
    const { id } = req.params
    const getProductById = containerProduct.getById(Number(id))
    //console.log(admin)
    res.
    res.setHeader('Content-Type', 'text/html')
    res.render('productSelected', { getProductById, admin } )
})

//--------Router POST ---------
 router.post("/", (req, res) => {
    console.log('Post: ' + req.body)
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')

    const addProduct = {
        timestamp: timestamp,
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price),
        picture: req.body.picture,
        code: req.body.code,
        stock: parseInt(req.body.stock)
    }
    // console.log('Datos post: ' + req.req.body)

    containerProduct.saveProduct(addProduct)
    res.setHeader('Content-Type', 'text/html')
    res.status(201).render('productSaved', { addProduct } )
})

//--------Router Put ---------
router.post('/:id', (req, res) => {
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')
    const { id } = req.params
    const { name, description, price, picture, code, stock } = req.body
    const updateProductById = containerProduct.updateProduct(id, timestamp, name, description, price, picture, code, stock)
    
    res.setHeader('Content-Type', 'text/html')
    res.status(201).render('productUpdated', { updateProductById } )
})


//--------Router DELETE BY ID ---------
router.get('/:id', (req, res) => {
    const { id } = req.params
    const productDeleted = containerProduct.deleteById(id)
    console.log('producto a borrar: '+productDeleted)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render( 'productDeleted', { productDeleted } )
})

// --------Set Storage with Multer ------
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploadFiles')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// let upload = multer({ storage: storage})

// app.post('/uploadFiles', upload.single('thumbnail'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//         const error = new Error('File upload failed')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

module.exports = router;