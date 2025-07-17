const express = require("express");
require("dotenv").config()
const app=express();
require("dotenv").config({path:"../.env"})


app.use(express.urlencoded({extended:true}))
app.use(express.json());
const session = require('express-session');

const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/sanphamRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/cart', cartRoutes);

// test route để thêm nhanh
// app.get('/', (req, res) => {
//   res.render('home');
//   //res.send(`<a href="/cart/add/1">Thêm sản phẩm 1</a> | <a href="/cart">Xem giỏ hàng</a>`);
// });
// db.js
app.use('/', productRoutes); // Trang chủ


// Biến toàn cục cho view (home.ejs, v.v.)

app.use("/api/khachhang",require('./routes/apiRoutes/khachhangRoutes'))


app.use('/', userRoutes);  

app.listen(3000,(err)=>{
    if(err) throw err;
    console.log("http://localhost:3000")
})
