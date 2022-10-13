const express = require('express')
const { Router } = express
const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------- Productos ----------------
const ContainerProducts = require('../containerProducts')
const containerProduct = new ContainerProducts("./productos.json")
const getAllProducts = containerProduct.getAllProd()

//---------ADMIN / USER -----------
const admin = true  // change to false to simulate user, change to true to simulate admin

//--------Router GET ALL ---------
router.get('/', (req, res) => {
    res.json(getAllProducts)
})

//--------Router GET BY ID ---------
router.get('/:id', (req, res) => {
    const { id } = req.params
    const getProductById = containerProduct.getById(Number(id))
    //console.log(admin)
    res.json(getProductById)
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
    
    containerProduct.saveProduct(addProduct)
    res.json(addProduct)
})

//--------Router PUT ---------
router.put('/:id', (req, res) => {
    console.log('Put: ' + req.params.id)
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')
    const { id } = req.params
    const { name, description, price, picture, code, stock } = req.body
    
    const updateProductById = containerProduct.updateProduct(id, timestamp, name, description, price, picture, code, stock)

    res.json(updateProductById)
})

//--------Router DELETE BY ID ---------
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const productDeleted = containerProduct.deleteById(id)
    console.log('producto a borrar: ' + productDeleted)
    
    res.json(productDeleted)
})

module.exports = router;