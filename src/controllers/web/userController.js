const User = require('../../models/userModel');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { tendangnhap, password } = req.body;
  const user = await User.findByEmailAndPassword(tendangnhap, password);

  if (!user) {
    return res.render('login', { error: 'Email hoặc mật khẩu không đúng' });
  }

  // Gán thông tin đăng nhập vào session
  req.session.user = {
    id: user.makh,
    ten: user.tendangnhap,
    password: user.password
  };

  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
