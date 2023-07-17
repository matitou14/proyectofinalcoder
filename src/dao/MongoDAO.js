import UserModel from '../models/userModel.js';
import ProductModel from '../models/productsModel.js';
import CartModel from '../models/cartModel.js';

export default class MongoDao {
    constructor() {
        this.models = {
            'User': UserModel,
            'Product': ProductModel,
            'Cart': CartModel
        };
    }

    async get(options, entity) {
        if(!this.models[entity]) throw new Error ('Entity not found in models');
        let results = await this.models[entity].find(options);
        return results.map(result => result.toObject());
    }

    async insert(document, entity) {
        if (!this.models[entity]) throw new Error('Entity not found in models');
        try {
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result ? result.toObject() : null;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}
