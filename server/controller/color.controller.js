const ColorModal = require('../modal/colorSchema.js')// color schema file


// color related operations
const getColor = async (req, res) =>{
    const data = await ColorModal.find();
    res.send(data)
}

const addColor = async (req, res) =>{
const {colorName}=req.body
const data = await ColorModal.create({colorName:colorName});
    res.send(data)
}

module.exports ={
    getColor,
    addColor,
}