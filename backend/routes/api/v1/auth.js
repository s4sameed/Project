const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const authController = require('../../../controllers/api/v1/auth');


router.post('/login', [
        body("username").notEmpty().withMessage('username required'),
        body("password").notEmpty().withMessage('password required')
    ],
    authController.login
)

router.post('/register', [
    body("username").notEmpty().withMessage('username required'),
    body("password").notEmpty().withMessage('password required')
    ],
    authController.register
);


router.get('/logout', authController.logout);

module.exports = router;