
const db = require('../config/mysql');

// Lấy thông tin sản phẩm theo ID
exports.getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM sanpham WHERE masp = ?', [id]);
  return rows[0];
};

// Lấy tất cả sản phẩm
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM sanpham');
  return rows;
};
