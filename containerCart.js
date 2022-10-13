const fs = require("fs")

module.exports = class ContainerCart {
    constructor(myFile) {
        this.myFile = myFile
        try {
            this.carts = fs.readFileSync(this.myFile, 'utf-8')
            this.carts = JSON.parse(this.carts)
        }
        catch (error) {
            const today = new Date()
            const timestamp = today.toLocaleString('en-GB')
            this.carts = {
                "id_Cart": 1,
                "timestampCart": timestamp,
                "productos": []
            }
        }
    }
        
    saveCart(addCart) {
        const fileContent = this.carts
        //console.log('FileContent: '+ fileContent)
        if (addCart !== undefined && fileContent !== undefined) {
            const cartToSave = JSON.stringify([...fileContent, { id_Cart: fileContent[fileContent.length - 1].id_Cart + 1 , ...addCart}], null, 2)
            try {
                this.carts = fs.writeFileSync(this.myFile, cartToSave)
                // console.log('try de saveproducts: '+ productToSave)
                return { addCart }
            } catch (error) {
                console.log(error)
                return { Error: 'Upps! Hubo un error y no pudimos guardar el Producto.' }
            }
        } else {
            return { Error: 'Upps! We had some problems saving the Product, try later.' }
        }
    }
    

    deleteById(id_Cart) {
            const fileContent = this.carts
            const nonDeletedCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
            const cartToBeDeleted = fileContent.filter(item => item.id_Cart === parseInt(id_Cart))
            //console.log('cartToBe deleted: '+ JSON.stringify(cartToBeDeleted))
            let arrayOrdered = nonDeletedCarts.sort((a,b) => { return a.id - b.id })
            //console.log('id cart: '+id_Cart)    
            
            if (cartToBeDeleted !== undefined && cartToBeDeleted.length > 0) {
                    try {
                        this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered, null, 2));
                        return { Success: `Cart Deleted successfully - ${JSON.stringify(cartToBeDeleted)} `}
                    
                    } catch (error) {
                        return { Error: `Upps! The cart with the Id#${id_Cart} was not founded.`}
                    }
    
            } else {
                return { Error: `Sorry, the Cart Id#${id_Cart}, DOES NOT exists on the DB!` }
            }
        }


    getCartById(id_Cart) {
            const fileContent = this.carts
            const cart = fileContent.find(cart => cart.id_Cart === parseInt(id_Cart))
            
            if (cart) {
                return cart
            } else {
                return { Error: `We could not find the Cart with id ${id_Cart}` }
            }
    }


    // updateProduct(id, timestamp, name, description, price, picture, code, stock ) { //updateProductById //id, timestamp, name, description, price, picture, code, stock
    //         const fileContent = this.products
    //         const productId = fileContent.find(item => item.id === Number(id))
            
    //         if (productId.id !== undefined && productId.id > 0 || productId !== {}) {
    //             const nonUpdatedProducts = fileContent.filter(item => item.id !== parseInt(id))
    //             const updatedProduct = { id: Number(id), timestamp, name, description, price: Number(price), picture, code, stock: Number(stock) }
    //             //console.log(updatedProduct)
    //             let array = [updatedProduct, ...nonUpdatedProducts]
    //             let arrayOrdered = array.sort((a,b) => { return a.id - b.id })
    //             //console.log('Array ordered: '+JSON.stringify(arrayOrdered))
    //             try {
    //                 this.products = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
    //                 return updatedProduct
    
    //             } catch (error) {
    //                 return { Error: `Error Actualizando Producto. Descripción error: ${error}` }
    //             }
    
    //         } else {
    //             return { Error: 'Producto no encontrado!!' }
    //         }
    //     }
    
}