// const mongoose = require("mongoose");
const UserModal = require('../modal/userSchema')// user schema file
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

const privateKey = 'D#i$m#p$a@l' // replace with your own secret key


const userRegister = async (req, res) => {
    const { name, email, password, phoneno } = req.body;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format'});
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/ .test(password)) {
        return res.status(400).json({ message: 'The password must be 8-15 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.'});
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const data = await UserModal.create({
        name: name,
        email: email,
        password: hashPassword,
        phoneno: phoneno
    })
    res.send(data)
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await UserModal.findOne({ email: email })
    // res.send(data)

    if (!data) {
        res.send("Invalid User")
    } else {
        const comparePassword = await bcrypt.compare(password, data.password);
        if (comparePassword) {
            // res.send("User login successful")
            const token = await jwt.sign({email: data.email, password:data.password},privateKey,{ expiresIn: '1h' })
            res.status(200).send({ message: "User login successful" ,token,data:data});
        } else {
            res.send('Wrong Password')
        }
    }
    // if (data.password == password) {
    //     res.send("Login Successful")
    // }
    // else {
    //     res.send("Invalid Password")
    // }
}

// Function to generate a secure 6-digit OTP
// function generateOTP() {
//     return crypto.randomInt(100000, 999999).toString();
// }

// generate otp
const sendOtp = async (req,res)=>{
      try {
        const {email} = req.body;
        const data = await UserModal.findOne({ email: email })
        console.log(data);
        if (!data) {
            res.status(404).send("User not found")
        }else{
            const otp = Math.floor(100000 + Math.random() * 900000);
            const transporter = nodemailer.createTransport({
                service:'gmail',
                 auth: {
                   user: "gurjardimpal5@gmail.com",
                   pass: "pxgl nmwe gowi qwwx",
                 },
               });
             const info = await transporter.sendMail({
                 from: 'gurjardimpal5@gmail.com', // sender address
                 to: email, // list of receivers
                 subject: "OTP ✔", // Subject line
                 text: `Your OTP code is ${otp}`, // plain text body
                 html: `<b>Your OTP code is ${otp}</b>` // html body
               }
             );
             console.log(otp);
             const otpUpdate = await UserModal.findByIdAndUpdate({_id:data._id},{otp:otp},{new:true});
             res.status(200).send({message:'OTP sent successfully',otp});
             console.log('OTP sent successfully: %s', info.messageId);
        }
      
      
      } catch (error) {
        console.error("Enter sending OTP:", error);
      }
} 

// match otp
const matchOtp = async(req,res)=>{
    const {email,otp} = req.body;
    const data = await UserModal.findOne({ email: email })
    if(data.otp === otp){
        res.status(200).send({message:"OTP match successfully"})
    }else{
        res.status(400).send({message:"Invalid OTP"})
    }
}

// new password
const newPassword = async(req,res)=>
{
try {
    const{email,newPassword}=req.body
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/ .test(newPassword)) {
        return res.status(400).json({ message: 'The password must be 8-15 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.'});
    }
    const data = await UserModal.findOne({email : email})
    console.log(data);
    const hashPassword = await bcrypt.hash(newPassword,10)
    const passwordUpdate = await UserModal.findByIdAndUpdate({_id:data._id},{password:hashPassword},{new:true});
    if(passwordUpdate){
        res.status(200).send({message:"password updated successfully",password:hashPassword})
    }
    else{
        res.status(400).send({message:"password can not be update"})
    }
} catch (error) {
    res.status(500).send({message:"Internal server error",error:error.message})
}
  

}

// get data function
const getData = async (req, res) => {
    const data = await UserModal.find()
    res.send(data)
}
// add data function
const addData = async (req, res) => {
    const data = await UserModal.insertOne(req.body);
    res.send(data)
}
// update data function
const updateData = async (req, res) => {
    const data = await UserModal.updateOne(req.params, req.body);
    res.send(data)
}
// delete data function
const deleteData = async (req, res) => {
    const data = await UserModal.deleteOne(req.params);
    res.send(data)
}


module.exports = {
    userRegister,
    userLogin,
    getData,
    addData,
    updateData,
    deleteData,
    sendOtp,
    matchOtp,
    newPassword

}