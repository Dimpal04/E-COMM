
const CategoryModal = require('../modal/categorySchema.js')// category schema  file

// category related operations
const getCategory = async ( req, res) =>{
    const data = await CategoryModal.find();
    res.send(data)
}

const addCategory = async (req, res) =>{
    const data = await CategoryModal.insertOne(req.body);
    res.send(data)
}

module.exports={
    getCategory,
    addCategory
 
}