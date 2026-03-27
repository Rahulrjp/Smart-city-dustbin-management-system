import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
    binNumber: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: {
            type: [Number],
            required: true
        }
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
        enum: ["EMPTY", "PARTIAL", "FULL", "OVERFLOW"],
        default: 'Empty'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
})

BinSchema.index({ location: "2dsphere" });
// BinDataSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 }); // 30 days

const BinModel = mongoose.model('Bin', BinSchema);

export default BinModel;