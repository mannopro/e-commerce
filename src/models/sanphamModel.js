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

module.exports={getAll,getProductsByType};
