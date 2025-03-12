const AddressModal = require('../modal/adderssSchema')

// address related operations
const getAddress = async(req,res)=>{
    try {
        const data = await AddressModal.find();
        res.status(200).send({message:"Address found",data:data});
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error});
    } 
}

const getOneAddress = async(req,res)=>{
    try {
        const data = await AddressModal.findOne(req.params.id);
        if (!data) {
            return res.status(404).send({ message: "Address not found" });
        }
        res.status(200).send({ message: "Address found", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

const addAddress = async(req,res)=>{
   
    try{
        const {user_id,city,state,country,pincode,address,phone_no}=req.body
        if (!/^[0-9]{10}$/.test(phone_no)){
            return res.status(400).send({message:"Invalid phone number"})
        }
        const data = await AddressModal.create({user_id:user_id,
            city:city,
            state:state,
            country:country,
            pincode:pincode,
            address:address,
            phone_no:phone_no
         })
         res.status(200).send({message:"Address added successfully", data:data});
    }catch (error) {
        res.status(500).send({message:"Internal server error",error:error});
    }
}
const updateAddress = async (req, res) => {
    try {
        const data = await AddressModal.updateOne(req.params);
        res.status(200).send({ message: "Address updated successfully", data: data });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const data = await AddressModal.deleteOne(req.params);
        res.status(200).send({ message: "Address deleted successfully", data})
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

module.exports ={
    getAddress,
    getOneAddress,
    addAddress,
    updateAddress,
    deleteAddress
}