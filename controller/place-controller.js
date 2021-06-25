const validationResult=('express-validator');
const mongoose=require('mongoose');

const httpError=require('model/http-error');
const Place=require('model/place');
const User=require('model/user');
const { findById } = require('../model/user');


const getPlaceById=async(req,res,next)=>{
    const placeId=req.params.pid 
    let place
    try{
        place=await Place.findById(placeId);
    } catch(err){
        const error=new httpError('Something went wrong, could not find the place', 500);
        return next(error)
    }

if (!place){
    const error= new httpError('Could not find the place for the id provided', 404);
    return next(error)
}

res.json({place:place.toObject({getters:true})});

}

const getPlaceByUserId=async(res,req,next)=>{
    const userId=req.params.uid;
    let userWithPlaces;
    try{
        userWithPlaces=await User.findById(userId).populate('places');
    }catch(err){
        const error=new httpError('Something went wrong, could not find the places',500);
        return next(error);
    }

    if (!userWithPlaces || userWithPlaces.places.length===0 ){
        return next(new httpError('unable to fine places', 404))
    }

}


const createPlace=async (req,res,next)=>{
const errors=validationResult(req)
if (!errors.isEmpty){
    return next(httpError('An error occurred while processing the request, please try again', 422))
}

const {title, description, address, creator}=req.body

let coordinates
try{
    coordinates=await getCoordsForAddress(address)
}catch (error){
    return next(error)
}

const createdPlace= new Place({
    title,
    description,
    address,
    coordinates: coordinates,
    creator
})

let user;
try{
    user=await User.findById(creator)
}catch(err){
    const error=new httpError('An error occurred while identifying the user', 500);
    return next(error);
};

if (!user){

    const error=new httpError('No user was found, please check your Id', 404)
    return next(error)
}

try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({session:sess});
    user.places.push(createdPlace);
    await user.save({session:sess});
    await sess.commitTransaction();
    

}




}    


