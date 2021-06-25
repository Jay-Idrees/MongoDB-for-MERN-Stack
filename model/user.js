const mongoose=require('mongoose');
const uniqueValidator=reqire('mongoose-unique-validator');

const Schema=mongoose.Schema

const userSchema= new Schema({
    name:{type:String, reuired:true},
    email:{type:String, required:true, unique:true},
    place:[{type:mongoose.Types.ObjectId, required:true, ref:'Place'}]
});

userSchema.plugin(uniqueValidator); 

module.exports=mongoose.model('User', userSchema)