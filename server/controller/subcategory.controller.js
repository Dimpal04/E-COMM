const SubCategoryModal = require('../modal/subcategorySchema.js')// sub category schema  file
// subcategory related operations
const addSubCategory = async (req, res) =>{
    const data = await SubCategoryModal.insertOne(req.body);
    res.send(data)
}

const getSubCategory = async (req, res) =>{
    const data = await SubCategoryModal.find()
    res.send(data)
}

module.exports = {
    addSubCategory,
    getSubCategory
}