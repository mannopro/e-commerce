const express = require('express');
const router = express.Router();
const productController = require('../controllers/web/sanphamController');

router.get('/', productController.showHome);

module.exports = router;
