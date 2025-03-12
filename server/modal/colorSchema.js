const mongoose = require("mongoose")

const colorSchema = {
 color_id:{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'color'
     
    },
    colorName: {
        type: String,
        required: true
    }

}

const ColorModal = mongoose.model('color', colorSchema)
module.exports = ColorModal;