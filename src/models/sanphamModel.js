const db=require('../config/mysql/mysql.js')

const getAll = async()=>{
    try {
        const mysql='SELECT* FROM SANPHAM';
        const [results]=db.query(mysql);
        return results;
    } catch (error) {
        console.log(error);
    }
}

const getProductsByType = async(category)=>{
    try {
        const sql=`SELECT *
         FROM sanpham join loaisanpham 
         WHERE sanpham.maloaisp=loaisanpham.maloaisp and loaisanpham.ten=?'
         `
         const [results]=db.query(sql,[category]);
         return results;
    } catch (error) {
        console.log(error);
    }
}
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


module.exports={getAll,getProductsByType};
