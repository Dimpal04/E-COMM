const mongoose = require("mongoose")

const productSchema = {
    p_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    p_name: {
        type: String,
        required: true,
        trim: true
    },
    p_price: {
        type: Number,
        required: true,
        trim: true
    },
    p_description: {
        type: String,
        required: true,
        trim: true
    },
    p_quantity: {
        type: Number,
        required: true,
        trim: true
    },
    p_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        trim: true
    },
    p_subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true,
        trim: true
    },
    p_color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
        required: true,
        trim: true
    },
    p_size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size',
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        trim: true
    },
    img: {
        type: Array,
        require: true
    }
}

const ProductModal = mongoose.model('product', productSchema)

module.exports = ProductModal