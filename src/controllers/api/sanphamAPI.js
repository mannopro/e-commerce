const sanphamModel=require("../../models/sanphamModel");

const getProductsByType= async(req,res)=>{
    try {
        const products = await sanphamModel.getProductsByType(req.category);
        res.status(200).json({products:products,message:"getProductsByType Success"})
    } catch (error) {
         res.status(400).json({error:error.message})   
    }
}
module.exports={getProductsByType}