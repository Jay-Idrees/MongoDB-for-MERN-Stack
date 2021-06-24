const express=require('express');
const {check}=require('express');

const placeController=require('place-controller.js');
const router = require('../routes/user-routes');

router=express.Router();

router.get('/:pid', placeController.getPlaceById);

router.get('/user/:uid',
[
check('title').not().isEmpty(),
check('description').not().isEmpty().isLength({min:5}),
check('address').not().isEmpty(),
]

, placeController.getPlaceByUserId)

router.update('/:pid',
[
    check('title').not().isEmpty(),
    check('descripttion').not().isLength({min:6})

], placeController.updatePlace)

router.delete('/:uid', placeController.deletePlace)

module.exports=router