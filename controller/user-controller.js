const validateResult=require('express-validator');

const httpError=require('./model/http-error');
const User=require('./model/user')



// Get Request

const getUsers=async(req,res,next)=>{
    let users;
    try{
        users= await User.find({},'-password');
    } catch(err){
       const error=new httpError('Unable to fetch users', 500);
        return next(error)
    };
    res.json({users:users.map(user=>user.toObject({getters:true}))})
}


//Sign up
const signup=async(req,res,next)=>{
    const errors=validationResult(req);
    if (errors.isEmpty){
        return next(new httpError("Inputs passed contain errors",422));
    }
    const {name, email, password}=req.body;

    let existinguser
    try{
        existinguser=await User.findOne({email:email})
    }
}// end of signup





// Login