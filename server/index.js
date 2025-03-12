const express = require('express')
const app = express()
const cors = require('cors')
require('./db/db.js')
require('dotenv').config();
const multer = require('multer')
const path = require('path')
var bodyParser = require('body-parser')
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())


const user = require('./controller/user.controller.js')
const product = require('./controller/product.controller.js')
const category = require('./controller/category.controller.js')
const subcategory = require('./controller/subcategory.controller.js')
const color = require('./controller/color.controller.js')
const size = require('./controller/size.controller.js')
const contact = require('./controller/contact.controller.js')
const { Token } = require('./Middleware/userToken.js')
// const{validateUserData }=require('./Middleware/validation.js')
const review = require('./controller/review.controller.js')
const admin = require('./controller/admin.controller.js')
const address = require('./controller/address.controller.js')
const { connection } = require('./db/db.js');
connection()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, './Images'), function (error) {
      if (error) {
        throw error
      }
    })
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname
    cb(null, name, function (error) {
      if (error) {
        throw error
      }
    })
  }
})

const upload = multer({ storage: storage })


// register API
app.post('/register', user.userRegister)
// login API
app.post('/login', user.userLogin)
// get data
app.get('/getData', user.getData)
//  user insert data API
app.post('/addData', user.addData)
// user update data API
app.put('/updateData/:_id', user.updateData)
// user delete data API
app.delete('/deleteData/:_id', user.deleteData)

// send otp notification api
app.post('/sendOtp', user.sendOtp)
// match otp api
app.post('/matchOtp', user.matchOtp)
// update password
app.post('/updatePassword', user.newPassword)


// product get data API
app.get('/getProduct', product.getProduct)
// product insert data API
app.post('/addProduct', upload.array('img'), product.addProduct)
// product update data  API
app.put('/updateProduct/:_id', product.updateProduct)
// product delete data API
app.delete('/deleteProduct/:_id', product.deleteProduct)

// product search
app.get('/getSearchProduct', product.searchProduct)
// price filter
app.get('/priceFilter', product.productPrice)

// category get data API
app.get('/getCategory', category.getCategory)
// category insert data API
app.post('/addCategory', category.addCategory)


// subcategory insert data API
app.post('/addSubCategory', subcategory.addSubCategory)
// subcategory find data API
app.get('/getSubCategory', subcategory.getSubCategory)


// color get data API
app.get('/getColor', color.getColor)
// color insert data API
app.post('/addColor', color.addColor)


// size get data API
app.get('/getSize', size.getSize)
// size insert data
app.post('/addSize', size.addSize)



// contact get data API
app.post('/addContact', contact.addContact)
// contact find data API
app.get('/getAllContacts', contact.getAllContacts)
// contact delete data API
app.delete('/deleteContact/:_id', contact.deleteContact)


// review get data API
app.get('/getReview', review.getReview)
// review get one data API
app.get('/getOneReview/:_id', review.getOneReview)
// review insert data API
app.post('/addReview', review.addReview)
// review update data API
app.put('/updateReview/:_id', review.updateReview)
// review delete data API
app.delete('/deleteReview/:_id', review.deleteReview)

// admin get data API
app.get('/getAdmin', admin.getAdminData)
// admin add data API
app.post('/addAdmin', Token, admin.addAdmin)
// admin update data API
app.put('/updateAdmin/:_id', admin.updateAdmin)
// admin delete data API
app.delete('/deleteAdmin/:_id', admin.deleteAdmin)
// admin login API
app.post('/adminLogin', admin.adminLogin)


// address get data API
app.get('/getAddress', address.getAddress)
// address get one data API
app.get('/getOneAddress/:_id', address.getOneAddress)
// address insert data API
app.post('/addAddress', address.addAddress)
// address update data API
app.put('/updateAddress/:_id', address.updateAddress)
// address delete data API
app.delete('/deleteAddress/:_id', address.deleteAddress)




app.listen(process.env.PORT, () => console.log("Server is running on port 5000"));
