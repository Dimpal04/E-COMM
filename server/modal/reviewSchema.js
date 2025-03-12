const mongoose = require("mongoose");

const reviewSchema={
    review_id:{
          type: mongoose.Schema.Types.ObjectId,
                ref: 'review'  
    },
    r_description:{
        type:String,
        required: true,
        trim: true

    },
    user_id:{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        trim: true
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        trim: true
    }
}

const ReviewModal = mongoose.model('review', reviewSchema)

module.exports = ReviewModal;