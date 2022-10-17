const fs = require("fs")

const ContainerProducts = require('./containerProducts')
const containerProduct = new ContainerProducts("./productos.json")

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
        
        if (addCart !== undefined && fileContent !== undefined) {
            const cartToSave = JSON.stringify([...fileContent, { id_Cart: fileContent[fileContent.length - 1].id_Cart + 1 , ...addCart}], null, 2)
            try {
                this.carts = fs.writeFileSync(this.myFile, cartToSave)
                return { addCart }
            } catch (error) {
                return { Error: 'Upps! Hubo un error y no pudimos guardar el Producto.' }
            }
        } else {
            return { Error: 'Upps! We had some problems saving the Product, try later.' }
        }
    }
    

    deleteById(id_Cart) {
            const fileContent = this.carts
            const nonDeletedCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
            const cartToBeDeleted = fileContent.find(item => item.id_Cart === parseInt(id_Cart))
            
            let arrayOrdered = nonDeletedCarts.sort((a,b) => { return a.id - b.id })
            
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
                return { Error: `We could not find the Cart with the id#${id_Cart}` }
            }
    }


    updateCart(id_Cart, producToAdd) {
            const fileContent = this.carts
            const cartId = fileContent.find(item => item.id_Cart === Number(id_Cart))
            
            if ( cartId.id_Cart !== undefined && cartId.id_Cart > 0 || cartId !== {} ) {
                const nonUpdatedCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
                const updatedCart = { id_Cart: Number(id_Cart), timestamp: producToAdd.timestamp , productos: [...cartId.productos, producToAdd] }
                
                let array = [updatedCart, ...nonUpdatedCarts]
                let arrayOrdered = array.sort((a,b) => { return a.id - b.id })
                
                try {
                    this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
                    return updatedCart
    
                } catch (error) {
                    return { Error: `Error Actualizando el Carrito. Descripción error: ${error}` }
                }
    
            } else {
                return { Error: 'Carrito no encontrado!!' }
            }
        }
    
         deleteProductById(id_Cart, id) {
            const fileContent = this.carts
            const nonDeletedProductCarts = fileContent.filter(item => item.id_Cart !== parseInt(id_Cart))
            const productCartToBeDeleted = fileContent.find(item => item.id_Cart === parseInt(id_Cart))
            
            const indexCart = fileContent.indexOf(productCartToBeDeleted)  
            const productToBeDeleted = containerProduct.getById(id)
            const arrayCart = fileContent[indexCart].productos
            const indexProductToBeDeleted = arrayCart.findIndex( (productToBeDeleted) => productToBeDeleted.id == parseInt(id))

                if (productCartToBeDeleted !== {} ) {

                    if (indexProductToBeDeleted >= 0) {
                        arrayCart.splice(indexProductToBeDeleted, 1)
                        //console.log('Ver array cart despues del splice: ' + JSON.stringify(arrayCart))
                        const arrayToBeSaved = [...nonDeletedProductCarts, { id_Cart: productCartToBeDeleted.id_Cart, timestamp: productCartToBeDeleted.timestamp, productos: arrayCart }]
                        let arrayOrdered = arrayToBeSaved.sort((a,b) => { return a.id_Cart - b.id_Cart })
                        
                        try {
                            this.carts = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
                            return { status: `Product Id#:${productToBeDeleted.id} of the Cart Id#:${id_Cart} was Deleted Successfully`, productToBeDeleted }
            
                        } catch (error) {
                            return { Error: `Error Updating Cart, no product has been deleted. Descripción error: ${error}` }
                        }

                    } else {
                        return productCartToBeDeleted
                    }
                } else {
                    return { Error: "Cart NOT Founded!!"}
                }
        }
}