
import { Schema, model } from 'mongoose';
import { TDemo } from './admin.interface';

const demoSchema = new Schema<TDemo>({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    category: {
        type: String,
        enum: [ 'Fiction' , 'Science' , 'SelfDevelopment' , 'Poetry' , 'Religious'],
        required: true
    },
    inStock: Boolean
}, {
    timestamps: true
})


  

export const DemoModle = model<TDemo>('Demo', demoSchema);