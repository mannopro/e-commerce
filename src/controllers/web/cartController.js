const sanphamModel = require('../../models/sanphamModel');
const cartModel = require('../../models/cartModel');

exports.viewCart = async(req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  let cart = await  cartModel.getCartByCustomer(user.id);
  if(!cart) return res.render('cart', {cart: [], total: 0});

  const items = await cartModel.getCartItems(cart.magiohang);
  const total = items.reduce((sum, item) => sum + item.thanhtien, 0) || 0;
  res.render('cart', {cart: items, total });
};

exports.addToCart = async (req, res) => {
  const user = req.session.user;
  if(!user) return res.redirect('/login');

  const product = await sanphamModel.getProductById(req.params.id);
  if (!product) return res.send('Sản phẩm không tồn tại');

  let cart = await cartModel.getCartByCustomer(user.id);
  if (!cart) {
    console.log("USER SESSION:", req.session.user);

    const cartId = await cartModel.createCart(user.id);
    cart = { magiohang: cartId };
  }
  await cartModel.addOrUpdateItem(cart.magiohang, product.masp, product.dongia);
  res.redirect('/cart');
};

exports.increaseQty = async (req, res) => {
  const user = req.session.user;
  const cart = await cartModel.getCartByCustomer(user.id);
  if (cart) await cartModel.updateQty(cart.magiohang, req.params.id, 1);
  res.redirect('/cart');
};

exports.decreaseQty = async (req, res) => {
  const user = req.session.user;
  const cart = await cartModel.getCartByCustomer(user.id);
  if (cart) await cartModel.updateQty(cart.magiohang, req.params.id, -1); 
  res.redirect('/cart');
};

exports.removeFromCart = async (req, res) => {
  const user = req.session.user;
  const cart = await cartModel.getCartByCustomer(user.id);
  if(cart) await cartModel.removeItem(cart.magiohang, req.params.id)
  res.redirect('/cart');
};
