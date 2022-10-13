const fs = require("fs")

module.exports = class ContainerProducts {
    constructor(myFile) {
        this.myFile = myFile
        try {
            this.products = fs.readFileSync(this.myFile, 'utf-8')
            this.products = JSON.parse(this.products)
        }
        catch (error) {
            this.products = []
        }
    }
    
    getAllProd() {
        const fileContentNonOrdered = this.products
        let fileContent = fileContentNonOrdered.sort((a,b) => { return a.id - b.id })
        return fileContent
    }

    getById(id) {
            const fileContent = this.products
            const product = fileContent.find(product => product.id === parseInt(id))
            
            if (product) {
                return product
            } else {
                return { Error: `Sorry, we could not find the Product with the ID# ${id}!` }
            }
    }

    saveProduct(addProduct) {
        const fileContent = this.products
        // console.log('FileContent: '+ fileContent)
            if (addProduct !== undefined && fileContent !== undefined) {
                const productToSave = JSON.stringify([...fileContent, { id: fileContent[fileContent.length - 1].id + 1 , ...addProduct}], null, 2)
                    try {
                        this.products = fs.writeFileSync(this.myFile, productToSave)
                        // console.log('try de saveproducts: '+ productToSave)
                        return productToSave
                    } catch (error) {
                        console.log(error)
                        return { Error: 'Upps! Hubo un error y no pudimos guardar el Producto.' }
                    }
            } else {
                return { Error: 'Upps! We had some problems saving the Product, try later.' }
            }
    }

    updateProduct(id, timestamp, name, description, price, picture, code, stock ) {
           
            const fileContent = this.products
            const productId = fileContent.find(item => item.id === Number(id))
            
            if (productId !== undefined && productId.id > 0 && productId !== null) {
                const nonUpdatedProducts = fileContent.filter(item => item.id !== parseInt(id))
                const updatedProduct = { id: Number(id), timestamp, name, description, price: Number(price), picture, code, stock: Number(stock) }
                
                let array = [updatedProduct, ...nonUpdatedProducts]
                let arrayOrdered = array.sort((a,b) => { return a.id - b.id })
                //console.log('Array ordered: '+JSON.stringify(arrayOrdered))
                try {
                    this.products = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
                    return {Response: `Product ${updatedProduct.name} Updated Successfully!!
                                        ${JSON.stringify(updatedProduct, null, 2)}`}
    
                } catch (error) {
                    return { Error: `Error Actualizando Producto. Descripción error: ${error}` }
                }
    
            } else {
                return { Error: `Sorry, we could not find the Product with the ID# ${id}!` }
            }
        }
    
    deleteById(id) {
            const fileContent = this.products
            const nonDeletedProducts = fileContent.filter(item => item.id !== parseInt(id))
            const productToBeDeleted = fileContent.filter(item => item.id === parseInt(id))
            
            let arrayOrdered = nonDeletedProducts.sort((a,b) => { return a.id - b.id })
                
            if (id !== undefined && productToBeDeleted.length > 0) {
                
                    try {
                        this.products = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered, null, 2));
                        return productToBeDeleted
                    } catch (error) {
                        return { Error: `Lo sentimos, hubo un error al escribir en archivo.`}
                    }
    
            } else {
                return { Error: `Sorry, the product with Id# ${id}, DOES NOT exist on the DB!` }
            }
        }
}