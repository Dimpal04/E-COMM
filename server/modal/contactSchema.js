const  mongoose  = require("mongoose")

const contactSchema={
    name:{type : String,
        required : true,
        trim : true
    },
    email:{type : String,
        required : true,
        unique : true,
        trim : true

    },
    subject:{type : String,
        required : true,
        trim : true

    },
    message:{type : String,
        required : true,
        trim : true

    }
}

const ContactModal = mongoose.model('contact',contactSchema)
module.exports = ContactModal;