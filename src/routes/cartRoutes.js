const express = require('express');
const router = express.Router();
const cartController = require('../controllers/web/cartController');
const { checkCustomerLogin } = require('../middlewares/munler');


router.get('/', checkCustomerLogin, cartController.viewCart);
router.get('/add/:id', checkCustomerLogin, cartController.addToCart);
router.get('/increase/:id', checkCustomerLogin, cartController.increaseQty);
router.get('/decrease/:id', checkCustomerLogin, cartController.decreaseQty);
router.get('/remove/:id', checkCustomerLogin, cartController.removeFromCart);


module.exports = router;
