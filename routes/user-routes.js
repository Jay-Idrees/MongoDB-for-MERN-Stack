const express=require('express');
const {check}=require('express-validator');
const user = require('../model/user');

const userController=require('./controllers/user-controller')

const router=express.Router();

router.get('/', userController.getusers)
router.post('/signup', userController,

[
    check('name').Not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').minLength({min:8})
], userController.signup

)
router.post('/login', userController.login)