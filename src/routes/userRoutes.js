const express = require('express');
const router = express.Router();
const userController = require('../controllers/web/userController');

router.get('/login', userController.showLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
