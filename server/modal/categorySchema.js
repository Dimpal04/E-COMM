const mongoose = require("mongoose")

const categorySchema = {
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:false

    },
    category_name: {
        type: String,
        required: true
    }
}

const CategoryModal = mongoose.model('category', categorySchema)

module.exports = CategoryModal;