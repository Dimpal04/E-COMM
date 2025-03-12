const ProductModal = require('../modal/productSchema.js')// product schema file
// product related operations 
const getProduct = async (req, res) => {
  // const data = await ProductModal.find().populate("p_category");
  const data = await ProductModal.find().populate(["p_category", "p_subcategory", "p_color", "p_size"]);
  // const data = await ProductModal.find().populate("category").setOptions({ strictPopulate: false });
  res.send(data)
}

const addProduct = async (req, res) => {
  try {
    const { p_name, p_price, p_description, p_quantity, p_category, p_subcategory, p_color, p_size, user_id } = req.body
    console.log(req.body);
    const imgArray = []

    const data = await ProductModal.create({
      p_name: p_name,
      p_price: p_price,
      p_description: p_description,
      p_quantity: p_quantity,
      p_category: p_category,
      p_subcategory: p_subcategory,
      p_color: p_color,
      p_size: p_size,
      user_id: user_id,
      img: imgArray

    })

    res.status(200).send({ message: "Product successfully added", data: data })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server error', error: error.message })
  }

}

const updateProduct = async (req, res) => {
  const data = await ProductModal.updateOne(req.params, req.body);
  res.send(data)
}

const deleteProduct = async (req, res) => {
  const data = await ProductModal.deleteOne(req.params);
  res.send(data)
}

const searchProduct = async (req, res) => {
  try {
    const { search } = req.body;
    const data = await ProductModal.find({ p_name: { $regex: search, $options: "i" } });

    if (data.length > 0) {
      return res.status(200).send({ message: "Data Found", Data: data });
    } else {
      return res.status(404).send({ message: "Data Not Found", Data: data });
    }
  } catch (error) {
    console.error("Search Error", error);
    return res.status(500).send({ message: "Internal Server Error", ERROR: error.message });
  }
};


const productPrice = async (req, res) => {
  try {
    const { price } = req.body
    const data = await ProductModal.find({ p_price: { $lte: price } });
    console.log(data);

    data.length > 0
      ? res.status(200).send({ message: "Data Found", Data: data })
      : res.status(404).send({ message: "No Products Found", DATA: [] })
  } catch (error) {

    return res.status(500).send({ message: "Internal Server Error", ERROR: error.message });


  }
}

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  productPrice

}