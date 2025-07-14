const Product = require('../../models/sanphamModel');

exports.showHome = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render('home', { products, user: req.session.user });
  } catch (err) {
    res.status(500).send('Lỗi server');
  }
};
