const express=require('express');
const {check}=require('express-validator');


const userController=require('./controllers/user-controller')

const router=express.Router();

router.get('/', userController.getusers)
router.post('/signup', userController,

[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:8})
], userController.signup

)
router.post('/login', userController.login)

module.exports=router;