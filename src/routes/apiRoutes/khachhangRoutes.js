const express=require("express");
const router=express.Router();
const khachhangAPI=require("../../controllers/api/khachhangAPI");
router.post("/signup",khachhangAPI.signup)
router.post("/signin",khachhangAPI.signin)


module.exports=router