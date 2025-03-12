const ReviewModal=require('../modal/reviewSchema')

const getReview = async(req,res)=>{
const data = await ReviewModal.find().populate(["user_id","product_id"]);
res.send(data)
}

const getOneReview = async(req,res)=>{
    try {
        const data = await ReviewModal.findOne(req.params).populate(["user_id","product_id"]);
        res.status(200).send({message:"Review Details", data:data})
    } catch (error) {
        res.status(500).send({message:"Internal server error", error:error.message})
    }
  
}
const addReview = async(req,res)=>{
    try {
        const {r_description,user_id,product_id}=req.body;
        const data = await ReviewModal.create({r_description:r_description,user_id:user_id,product_id:product_id});
        res.status(200).send({message:"Review Details", data:data})
    } catch (error) {
        res.status(500).send({message:"Internal server error", error:error.message})
    }
  
}

const updateReview =async(req,res)=>{
    try {
        const data = await ReviewModal.updateOne(req.params,req.body);
        res.status(200).send({message:"Review Updated",data:data})
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message})
    }
   
}

const deleteReview = async(req,res)=>{
    try {
        const data = await ReviewModal.deleteOne(req.params);
    res.status(200).send({message:"Review Deleted",error:error.message})
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.m
            
        })
    }
    
}

module.exports={
    getReview,
    getOneReview,
    addReview,
    updateReview,
    deleteReview,
 
}