const express=require("express")
require("dotenv").config()
const app=express();



app.set("view engine","ejs")
app.set('layout', 'layout/layout');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json());



app.listen(process.env.APP_PORT,(err)=>{
    if(err) throw err;
    console.log("http://localhost:3000")
})
