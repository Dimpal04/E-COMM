const express = require('express')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dimpal')
const app = express()
app.use(express.json())

const empSchema = {
    ename: String,
    salary: Number,
    department: String
}

const EmpModal = mongoose.model('emp', empSchema)

const getData = async (req, res) => {
    const data = await EmpModal.find({})
    console.log(data)
}
// get data API
app.get('/getData', async (req, res) => {
    const data = await EmpModal.find()
    res.send(data)
})
// ---------------------------------------------------------

// insert data into database through function
const insertData = async (data) => {
    const userData = await EmpModal.insertOne(
        // ename: "dimpal",
        // salary: 50000,
        // department: "IT"
        data
    )
    console.log(data);

}
// insert data API
// app.post('/insertData', async (req, res) => {
//     const data = await EmpModal.insertOne(req.body)
//     res.send(data)
// })
app.post('/insertData', async (req, res) => {
    const data = await EmpModal.insertOne(req.body)
    res.send(data)
})
// ---------------------------------------------------------


// update data into database through function
const updateData = async (ename, data) => {
    const updateUserData = await EmpModal.updateOne({ ename: ename }, { $set: data })
    return updateUserData;
    // const data = await EmpModal.updateOne({
    //     ename: 'dimpal',
    //     salary: 50000,
    // }, { $set: { ename: 'ruhi' ,salary:60000} })
    console.log(data);

}
app.put('/updateData/:ename', async (req, res) => {
    const data = await EmpModal.updateOne(req.params.ename, req.body);
    res.send(data);
})
// app.put('/updateData/:_id',async(req,res)=>{
//     const data =await EmpModal.updateOne(req.params,req.body)
//     res.send(data)
// })
// ---------------------------------------------------------


// delete data in database through function
const deleteData = async (ename) => {
    const data = await EmpModal.deleteMany({
        // ename:'ruhi'
        ename: ename
    })
    console.log(data);
}
// create API to delete data
// app.delete('/deleteData/:ename', async (req, res) => {
//     const data = await deleteData(req.params.ename)

//     res.send(data)
// })

app.delete('/deleteData/:_id', async (req, res)=>{
    const data = await EmpModal.deleteOne(req.params)
    res.send(data)
})
//  getData()

app.listen(8080)




