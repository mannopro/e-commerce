const db = require('../config/mysql');

exports.getCartByCustomer = async (makh) => {
    const [rows] = await db.query('select * from giohang where makh = ? and trangthai = 0 limit 1', [makh]);
    return rows[0];
};

exports.createCart = async (makh) => {
    const [result] = await db.query('insert into giohang(makh, ngaytao, trangthai) values(?, NOW(), ?)', [makh, 0]);
    return result.insertId;
};

exports.addOrUpdateItem = async (magiohang, masp, dongia) => {
    const [rows] = await db.query('select * from ctgiohang where magiohang = ? and masp = ?', [magiohang, masp]);
    if (rows.length > 0){
        await db.query(`
            update ctgiohang
            set soluong = soluong + 1, thanhtien = dongia * (soluong + 1)
            where magiohang = ? and masp = ?`, [magiohang, masp]);
    } else {
        await db.query('insert into ctgiohang(magiohang, masp, soluong, dongia, thanhtien) values(?, ?, 1, ?, ?)', [magiohang, masp, dongia, dongia]);
    }
};

exports.getCartItems = async (magiohang) => {
    const [rows] = await db.query('select sp.masp, sp.tensp, ct.soluong, ct.dongia, ct.thanhtien from ctgiohang ct join sanpham sp on sp.masp = ct.masp where magiohang = ?', [magiohang]);
    return rows;
}

exports.updateQty = async (magiohang, masp, delta) => {
    const [rows] = await db.query('select soluong from ctgiohang where magiohang = ? and masp = ?', [magiohang, masp]);
    if (rows.length > 0) {
        let newQty = rows[0].soluong + delta;
        if (newQty < 1) newQty = 1;
        await db.query('update ctgiohang set soluong = ?, thanhtien = dongia * ? where magiohang = ? and masp = ?', [newQty, newQty, magiohang, masp]);
    }
};

exports.removeItem = async (magiohang, masp) => {
    await db.query('delete from ctgiohang where magiohang = ? and masp = ?', [magiohang, masp]);
};