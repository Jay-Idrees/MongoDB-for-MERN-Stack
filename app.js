const express=require('express');
const bodyParser=require('body-parser');
const mongoose=reqire('mongoose');

const userRoutes=require('/routes/user-routes');
const placeRoutes=require('/routes/place-routes');
const httpError=require('/model/http-error');

const app=Express();

app.use