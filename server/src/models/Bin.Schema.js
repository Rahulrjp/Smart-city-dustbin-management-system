import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
    binId: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    fill: {
        value: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
            default: '%'
        }
    },
    totalHeight: {
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            enum: ['cm', 'm'],
            default: 'cm'
        }
    },
    distance: {
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            enum: ['cm', 'm'],
            default: 'cm'
        }
    },
    status: {
        type: String,
        enum: ['Empty', 'Almost Half Full', 'Half Full', 'Almost Full', , 'Full'],
        default: 'Empty'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
})

const BinModel = mongoose.model('Bin', BinSchema);

export default BinModel;