const { add, sub, div } = require('./calculator')
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const app = express()
app.use(express.json())

// ----------------------------------------------------------------------------------------------------------------
// get data from database
async function getData(req, res) {
    await client.connect();  //mongodb connection
    const db = client.db("dimpal"); //database connection
    const collection = db.collection('user'); //collection connection
    // console.log(collection);
    const data = await collection.find({}).toArray() // find data from database ,toArray method for data in array
    return data
    // console.log(data);
}
// getData();

//create API to getData(application programming interface)
app.get('/getData', async (req, res) => {
    const data = await getData();
    res.send(data)
})


// ----------------------------------------------------------------------------------------------------------------
// insert data in database
async function insertData(data) {
    await client.connect();
    const db = client.db("dimpal")
    const collection = db.collection("user")
    const insertUserData = await collection.insertOne(data)
    // const insertUserData = await collection.insertOne({"name":"meera","email":"meera@gmail.com","password":"meraa123","city":"surat","state":"gujrat","country":"india","pincode":215445,"address":"jamnager","phoneno":1234669852,"gender":"female","age":15,"dob":"25/4/2011"})
}

//create API to insert Data
app.post('/insertData', async (req, res) => {
    const data = await insertData(req.body)
    res.send(data)
})

// ----------------------------------------------------------------------------------------------------------------
// update data in database

async function updateData(id, data) {
    await client.connect();
    const db = client.db("dimpal");
    const collection = db.collection('user');
    const updateUserData = await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: data
    })
    return updateUserData;
    console.log(updateData);
    // const updateUserData = await collection.updateOne({_id:new ObjectId("67b401dd340102cec6044ab2")},{$set:{"name":"laxmi","email":"laxmi@gmail.com","age":18,"dob":"25/6/2008","password":"laxu123"}})
}

//create API to update Data
app.put('/updateData/:id', async (req, res) => {
    const data = await updateData(req.params.id, req.body);
    res.send(data)
})

// ----------------------------------------------------------------------------------------------------------------
// delete data in database
async function deleteData(id){
    await client.connect()
    const db=client.db("dimpal")
    const collection=db.collection("user")
    const deleteUserData = await collection.deleteOne({ _id: new ObjectId(id) })
    // const deleteUserData=await collection.deleteOne({_id: new ObjectId("67b401d5340102cec6044ab1")})
    return deleteUserData;
}
//create API to delete Data
app.delete('/deleteData/:id',async(req,res)=>{
    const data=await deleteData(req.params.id)
    res.send(data)
})


// app.get('/sub', (req, res) => {
//    res.send(sub(5, 10)); // directly passes the value
//  })
//      app.get('/add', (req, res) => {
//      res.send(add(req.query.num1, req.query.num2));

//     })
//     app.get('/div/:num1/:num2', (req, res) => {
//     // res.send(add(req.query.num1, req.query.num2));
//     res.send(div(req.params.num1, req.params.num2));
// })
app.listen(8000)