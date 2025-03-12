const SizeModal = require('../modal/sizeSchema.js')// size schema file


// size related operations
const getSize = async (req, res) =>{
    const data = await SizeModal.find();
    res.send(data)
}

const addSize = async (req, res) =>{
    const {size}=req.body;
    const data = await SizeModal.create({size:size});
    res.send(data)
}

module.exports ={
    getSize,
    addSize
}