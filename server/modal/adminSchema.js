const mongoose = require('mongoose')
const adminSchema ={
    admin_id:{
           type: mongoose.Schema.Types.ObjectId,
                       ref: 'admin'  
    },
    admin_name:{
        type:String,
        required: true,
        trim: true
    },
    admin_email:{
       type:String,
        required: true,
        trim: true
    },
    admin_password:{
       type:String,
        required: true,
        trim: true
    },
    admin_dob:{
       type:String,
        required: true,
        trim: true
    },
    admin_phoneno:{
       type:Number,
        required: true,
        trim: true
    },
    gender:{
       type:String,
        required: true,
        trim: true,
        enum:["male", "female","other"]
    }
}

const AdminModal = mongoose.model('admin',adminSchema)
module.exports= AdminModal