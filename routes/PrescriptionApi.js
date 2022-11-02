const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
const Prescription = require('../models/prescription');
require('../db/config');

const multer = require('multer')



const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png' ){
        cb(null,true)
    } else {
        cb(new Error('File Type not supported'),false)
    }
}

const upload = multer({storage:storage,limits:{
    fileSize: 1024 * 1024 * 5 
},fileFilter:fileFilter});


router.post("/add",upload.single('prescriptionImg'),async(req,resp,next)=>{
    console.log(req.file);
    try {

        console.table(req.body)

        Prescription.init()
        const setid = new mongoose.Types.ObjectId();
       
        const appointmentdata = new Prescription({
         _id: setid,
         prescriptionImg:req.file.path
        });
        //console.table(appointmentdata);

        let result = await appointmentdata.save(); 
        
        resp.status(200).json("Completed")
        //console.table(result);

    } catch(err){
        console.warn(err);
        resp.status(404).json("Err") // Sending res to client some err occured.
    }
})




module.exports = router;