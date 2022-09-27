import { promises as fs } from 'fs';
import { checkLength } from '../utilities/utilities';

export default class Container{
    
    async getById(id){
        let array = await this.getFoo()
        if(!checkLength(array)){
            return null
        }
        let object = array.find(element => element.id == id)
        return object ? object : null
    }
    async deleteById(id){
        const array = await this.getFoo()
        if(!checkLength(array)){
            throw new Error('No carts')
        }
        const object = array.find(element => element.id == id)
        try {
            if(object === undefined){
                throw new Error('Id not found')
            }
            const newArray = array.filter(element => element != object)
            console.log(`El siguiente elemento sera eliminado : \n${JSON.stringify(object)}`)
            await this.saveFoo(newArray);
            console.log(`Cambios guardados`);
            return object
        } catch (error) {
            console.error(error)
            throw (error)
        }
    }
}