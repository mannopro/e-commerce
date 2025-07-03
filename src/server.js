const express=require("express")
const app=express();
require("dotenv").config({path:"../.env"})


app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/api/khachhang",require('./routes/apiRoutes/khachhangRoutes'))


app.listen(process.env.APP_PORT,(err)=>{
    if(err) throw err;
    console.log("http://localhost:3000")
})
