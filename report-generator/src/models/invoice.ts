import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Invoice = model('Invoice', invoiceSchema);