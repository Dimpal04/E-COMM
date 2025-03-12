// Middleware/validation.js
const validateUserData = (req, res, next) => {
    const { email, password } = req.body;

    // validate email formate
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // validate password formate
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format'});
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and contain both letters and numbers'});
    }

    next();
};



module.exports = {
    validateUserData,

};







// const validateProductData = (req, res, next) => {
//     const { productName, price } = req.body;

//     const productNameRegex = /^[a-zA-Z0-9 ]{3,50}$/;
//     const priceRegex = /^\d+(\.\d{1,2})?$/;

//     if (!productNameRegex.test(productName)) {
//         return res.status(400).json({ message: 'Product name must be between 3 and 50 characters long and contain only letters, numbers, and spaces' });
//     }

//     if (!priceRegex.test(price)) {
//         return res.status(400).json({ message: 'Price must be a valid number with up to two decimal places' });
//     }

//     next();
// };