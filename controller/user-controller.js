const {validationResult}=require('express-validator');

const httpError=require('./model/http-error');
const User=require('./model/user');

// Get users

const getUsers=async (req,res,next)=>{
    let users;
    try{
        users=await User.find({},'-password');
    }catch(err){
        const error=httpError('An error occurred while obtainng the users',422);
        return next(error);
    }
    res.json({users:users.map(user=>user.toObject({getters:true}))});
};


const signup=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new httpError('The information you input did not pass validation checks, please try again', 422))
    }

    // Find whether an emmail already exisits-existing user
    const {name, email, password}=req.body

    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    } catch(err){
        const error=new httpError('An error occurred while signing up, please try again', 422);
        return next(error);
    }

    if (existingUser){
        const error=new httpError("The email you provided already exists, please log in",500)
        return next(error);
    }

    // Capture the signup data into created user object

    const createdUser=new User ({
        email,
        password,
        name,
        image:'www.electives.us',
        places:[]
    });


    // Save the information

    try{
       
            await createdUser.save();
        
    }catch(err){
        const error=new httpError('Signing up failed, please try again later', 404);
        return next(error);
    }


    // Send response
    res.status(201).json({user:createdUser.toObject({getters:true})});

}

const login=async (req,res,next)=>{
const {email, password}=req.body
let existingUser

try{
    existingUser=await User.findOne({email:email});
}catch(err){
    const error=new httpError('Your username or password are incorrect, please try again', 404);
    return next(error);
}

if (!existingUser||existingUser.password!=password){
    const error=new httpError('The username or password are incorrect, please try again', 404);
    return next(error)
}

res.json({message:'Successfully logged in'})
}