const mongoose = require("mongoose");
const ContactModal = require("../modal/contactSchema")

const addContact = async(req,res)=>{
    const data =await ContactModal.insertOne(req.body)
    res.status(200).send({
        message: 'Contact added successfully',
        data: data
    })
}

const getAllContacts = async(req,res)=>{
    const data= await ContactModal.find()
    res.status(200).send({
        message: 'All contacts fetched successfully',
        data: data
    })
}

const deleteContact = async(req,res)=>{
    const data = await ContactModal.deleteOne(req.params)
    res.status(200).send({
        message: 'Contact deleted successfully',
        data: data
    })
}

module.exports ={
    addContact,
    getAllContacts,
    deleteContact
  
}