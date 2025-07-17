const db= require("../config/mysql/mysql.js")
const findByUserName =  async (tendangnhap)=>{
   try {
    const sql="select * from khachhang where tendangnhap=?";
    const [result]= await db.query(sql,[tendangnhap]);
    return result;
   } catch (error) {
        console.log(error);
            return null;

   }
}

const insertKhachHang = async(username,password,name)=>{
    try {
        const sql='INSERT INTO KHACHHANG(tendangnhap,matkhau,hoten) VALUES(?,?,?)';
         await db.query(sql,[username,password,name]);
    } catch (error) {
      console.log(error);
    }
}

const checkKhachHang = async(username,password)=>{
    try {
        const sql='SELECT * FROM KHACHHANG WHERE tendangnhap=? and matkhau =?';
         const [raw]= await db.query(sql,[username,password]);
         return raw;
    } catch (error) {
      console.log(error);
        return null;

    }
}


module.exports={findByUserName,insertKhachHang}