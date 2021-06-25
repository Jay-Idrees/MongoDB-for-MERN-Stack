const express=require('express');
const bodyParser=require('body-parser');
const mongoose=reqire('mongoose');

const userRoutes=require('/routes/user-routes');
const placeRoutes=require('/routes/place-routes');
const httpError=require('/model/http-error');

const app=express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/places/', placeRoutes);

app.use((req,res,next)=>{
    const error=new httpError('Unable to find the route', 404)
    throw error;
});

app.use((error, res, req,next)=>{
    if(res.headerSent){
     return   next(error);
    }
    res.status(error.code||500);
    res.json({message:error.message||'An unknown error occurred'});
});

mongoose.connect('mongoDB+srv://url').connect(()=>{
    app.listen(5000);
}).catch(err=>{console.log(err)})