const mongoose = require("mongoose");

const userSchema = {
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    } ,
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {type:String,
        require: true,
        trim: true
    },
    phoneno: {type:Number,
        require: true,
        trim: true
        
    },
    otp:{
        type: Number,
        default: 0
    }

   
}

const UserModal = mongoose.model('user', userSchema)

module.exports = UserModal;