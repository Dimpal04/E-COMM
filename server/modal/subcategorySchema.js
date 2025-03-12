const  mongoose  = require("mongoose")

const subCategorySchema = {
     subcategory_id:{
            type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
         
        },
    category_id:{type :mongoose.Schema.Types.ObjectId,
            ref : 'category',
            required : true,
            trim : true
        },
    subcategory_name:{type : String,
        required : true,
        trim : true
    }
}

const SubCategoryModal = mongoose.model('subcategory', subCategorySchema)

module.exports = SubCategoryModal;