const { default: mongoose } = require("mongoose")

const addressSchema = {
    address_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    pincode:{
        type: Number,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    phone_no:{
        type: Number,
        required: true,
        trim: true
    }

}

const AddressModal = mongoose.model('address',addressSchema)

module.exports = AddressModal;