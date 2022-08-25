const { promises: fs } = require('fs')

class Container{
    constructor(route){
        this.route = route
    }
    save(mensaje){
        const mensajes = this.getAll()
        mensajes.push(mensaje)
        try {
            await fs.writeFile(this.route, JSON.stringify(productos, null, 2))
            return console.log('Guardado exitoso')
        } catch (error) {
            console.error('Error de escritura')
            return console.error(error)
        }
    }
    saveProduct(object){
        const products = await this.getAll()
        object.id = parseInt(object.id) 
        object.id = this.checkId(object, products)
        object.price = parseInt(object.price)
        try {
            console.log(`El siguiente elemento sera guardado : \n${JSON.stringify(object)}`)
            products.push(object)
            await fs.writeFile(this.route, JSON.stringify(products, null, 2))
            console.log('Guardado exitoso')
            return object
        } catch (error) {
            console.error('Error de escritura')
            console.error(error)
        }
    }
    getById(id){
        const products = await this.getAll()
        if(!this.checkLength(products)){
            return
        }
        let product = products.find(element => element.id == id)
        return product ? product : null
    }
    getAll(){
        try {
            let products = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            console.error('Error de lectura.')
            console.error(error)
            return []
        }
    }
    deleteById(id){
        console.log(id)
        const products = await this.getAll()
        if(!this.checkLength(products)){
            return
        }
        const product = products.find(element => element.id == id)
        console.log(product)
        const newProducts = products.filter(element => element != product)
        try {
            console.log(`El siguiente elemento sera eliminado : \n${JSON.stringify(product)}`)
            await fs.writeFile(this.route, JSON.stringify(newProducts, null, 2))
            console.log(`Cambios guardados`)
            return product
        } catch (error) {
            console.error('Error de escritura.')
            console.error(error)
        }
    }
    checkLength(arr){
        if (arr.length === 0){
            console.error('El array esta vacio')
            return false
        }
        return true
    }

    checkId(product, arr){
        arr.forEach(element => {
            if(element.id == product.id){
                console.warn('El id del elemento ya existe, se le asignara uno nuevo.')
                return this.newId(product, arr)
            } 
        });
            return product.id
    }
    newId(product, arr){
        arr.sort((a, b) => {return a - b}) // Ordenamos de forma ascendente segun el id
        product.id = parseInt(arr[arr.length - 1].id) + 1 // Tomamos el id mas grande le sumamos 1 y lo asignamos al producto
        console.log(`Nuevo id del producto : ${product.id}`)
        return product.id
    }
}

module.exports = Container;