const mongoose = require("mongoose")

const sizeSchema ={
     size_id:{
            type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
         
        },
    size:{
        type:String,
        required: true,
        trim: true
    }
}

const SizeModal = mongoose.model('size', sizeSchema)

module.exports = SizeModal;