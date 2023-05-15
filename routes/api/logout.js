const express = require('express');
const router = express.Router();
const Logoutcontroller = require('../../controllers/logoutController');

router.get('/', Logoutcontroller.handleLogout);

module.exports = router ;