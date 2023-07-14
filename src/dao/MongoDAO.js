import mongoose from "mongoose";
import User from "../models/userModel.js";
import Product from "../models/productsModel.js";
import Cart from "../models/cartModel.js";




export default class MongoDao {
    constructor(config) {
        this.mongoose = mongoose.connect(config.url).catch(error => {
            console.log(error)
            process.exit
        })
        const timestamp = {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
        const UserSchema = mongoose.Schema(User.schema, timestamp)
        this.models = {
                'User': User,
                'Product': Product,
                'Cart': Cart
            };
        }
        }
    
    get: async(options, entity) => {
        if(!this.models[entity]) throw new Error ('Entity not found in models')
        let results = await this.models[entity].find(options)
        return results.map(result => result.toObject)
    }
        
        
    insert: async(document, entity) => {
        if (!this.models[entity]) throw new Error('Entity not found in models')
        try {
            let instance = new this.models[entity](document)
            let result = await instance.save()
            return result ? result.toObject() : null
        } catch(error) {
            console.log(error)
            return null
        }
 }

