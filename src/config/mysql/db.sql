use master
create database quan_ly_ban_hang
go 
use quan_ly_ban_hang
go


create table sanpham(
masp  int identity(1,1) primary key ,
tensp nvarchar(255),
maloaisp int,
soluong int,
mota ntext,
dongia decimal(18, 2),
tinhtrang int,
xuatxu nvarchar(50),
chatlieu nvarchar(50), 
mausac nvarchar(50),
img nvarchar(255),
trangthai int,

)
go
create table nhanvien(
tendangnhap varchar(30),
matkhau char(32),
hoten nvarchar(50),
email varchar(30),
diachi ntext,
dienthoai varchar(20),
ngaysinh date,
gioitinh bit,
chucvu nvarchar(20),
trangthai nvarchar(20),

primary key(tendangnhap)
)
go

create table khachhang(
makh int identity(1,1) primary key  ,
hoten nvarchar(50),
diachi ntext,
dienthoai varchar(20),
ngaysinh date,
gioitinh bit,
trangthai int,

)
go
create table hdnhaphang(
maHoaDonNhap int identity(1,1) primary key,
ngaynhap date,
manv varchar(30),
mancc int,
tongtien decimal(18, 2),
trangthai int,
)
go
create table nhacungcap(
mancc int identity(1,1) primary key,
ten nvarchar(255),
website varchar(50),
email varchar(50),
dienthoai varchar(20),
diachi ntext,
trangthai int

)
go
create table cthdnhaphang(
maHoaDonNhap int,
masp int,
soluong int,
dongia decimal(18, 2),
thanhtien decimal(18, 2),
trangthai int
primary key(maHoaDonNhap,masp)
)
go
create table loaisanpham(
maloaisp int identity(1,1) primary key,
ten nvarchar(50),
trangthai int,
)
go
create table hdbanhang(
mahd int identity(1,1) primary key,
ngayban date,
manv varchar(30),
makh int,        
tongtien decimal(18, 2),
trangthai bit
)
go
create table cthdbanhang(
mahd int,
masp int,
soluong int,
dongia decimal(18, 2) ,
thanhtien decimal(18, 2),
giamgia decimal(18, 2),
loaigiam nvarchar(10),
trangthai bit,
primary key(mahd,masp)
)
go


alter table hdbanhang
add constraint FK_hdbanhang_khachhang foreign key(makh) references khachhang(makh)
alter table hdbanhang
add constraint FK_hdbanhang_nhanvien foreign key(manv) references nhanvien(tendangnhap)

alter table cthdbanhang
add constraint FK_cthdbanhang_hdbanhang foreign key(mahd) references hdbanhang(mahd)
alter table cthdbanhang
add constraint FK_cthdbanhang_sanpham foreign key(masp) references sanpham(masp)

alter table sanpham
add constraint FK_sanpham_loaisanpham foreign key(maloaisp) references loaisanpham(maloaisp)

alter table hdnhaphang
add constraint FK_hdnhaphang_nhanvien foreign key(manv) references nhanvien(tendangnhap)
alter table hdnhaphang
add constraint FK_hdnhaphang_nhacungcap foreign key(mancc) references nhacungcap(mancc)

alter table cthdnhaphang
add constraint FK_cthdnhaphang_hdnhaphang foreign key(maHoaDonNhap) references hdnhaphang(maHoaDonNhap)
alter table cthdnhaphang
add constraint FK_cthdnhaphang_sanpham foreign key(masp) references sanpham(masp)





select* from sanpham

select* from cthdnhaphang

select h.mahd,ngayban,n.hoten,s.tensp,c.soluong,c.dongia,c.thanhtien,h.tongtien,tendangnhap from hdbanhang h 
          join cthdbanhang c on h.mahd=c.mahd join sanpham s on s.masp=c.masp join nhanvien n on n.tendangnhap=h.manv 
         where h.mahd=1