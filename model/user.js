const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema

const userSchema= new Schema({

    name:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true, minlength:6},
    Image:{type:String, required:true},
    place:[{type:mongoose.Types.ObjectId, required:true, ref:'Place'}]
})

userSchema.plugin(uniqueValidator)

module.exports=mongoose.model('User', userSchema)