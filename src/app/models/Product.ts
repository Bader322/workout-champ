
import { ObjectId } from "bson";
import mongoose, { Document, Schema } from "mongoose";
export interface IProduct extends Document {
    _id: ObjectId,
    exercise: string,
    weight: string,
    reps: string,
    sets: string,
    volume: number
}

const productSchema: Schema = new mongoose.Schema({
    _id: {
        type: ObjectId
    },
    exercise: {
        type: String,
    },
    weight: {
        type: String,
    },
    reps: {
        type: String,
    },
    sets: {
        type: String,
    },
    volume: {
        type: String,
    },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema)

export default Product;
