const { sign } = require("jsonwebtoken");
const khachhang=require("../../models/khachhangModel");
        const bcrypt=require("bcrypt")

async function existingKhachHang(username) {
    const result=await khachhang.findByUserName(username);
    return result.length>0;
 }

 async function findByUserName(username) {
    const result=await khachhang.findByUserName(username);
    return result[0];
 }


const signup = async (req,res)=>{
    try {
        const {username,password}=req.body;
        console.log(username,password)
        const isExist=await existingKhachHang(username)
        if(isExist){
            res.status(400).json({message:"username already exists"})
        }
        
        const salt=10;
        const hashedPassword=await bcrypt.hash(password,salt);
          await khachhang.insertKhachHang(username,hashedPassword)
          res.status(200).json({message:"signup success"})
    } catch (error) {
            res.status(401).json({message:"signup failed",error:error.message})

    }
    
}

const signin = async(req,res)=>{
try {
     const {username,password}=req.body;
     console.log("tt",username,password)
     const user= await findByUserName(username);
    if(!user){
        res.status(400).json({message:"not found the user"});
        return

    }
    const mathchPassWord=await bcrypt.compare(password,user.matkhau); 
    
        if(!mathchPassWord){
        res.status(500).json({message:"no match password"});
    
    }
    delete user.matkhau;
    res.status(200).json({message:"signin success",user});
    console.log("success");


    
} catch (error) {
    res.status(500).json({message:"signin failed",error:error.message});

}
}

module.exports={signup,signin}