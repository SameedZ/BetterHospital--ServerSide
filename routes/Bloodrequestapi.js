const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blood_Request = require('../models/bloodrequest');
var bodyparser = require('body-parser');
const { route } = require('./Nurseapi');
var jsonparser = bodyparser.json();

require('../db/config');



router.route('/add').post(jsonparser,function(req,res){

  try{
    console.table(req.body);

    const Blood_Request_Data = new Blood_Request({
        _id: new mongoose.Types.ObjectId(),
        patient_id: req.body.patientid,
        Blood_Group:   req.body.bloodtype,
        Quantity_inML: req.body.bloodquantity
    })
    
    Blood_Request_Data.save().then((result)=>{
        console.warn(result)
        res.status(200).json("Completed")
    })

  } catch (err){
      console.log(err);
      res.status(404).json("Err") // Sending res to client some err occured.
  }


 })
 
router.route('/removeBloodRequest/:id').delete(function(req,res){
    
    Blood_Request.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{console.warn(err)})
        
})

router.route("/search/:Blood_Group").get(function(req,res){
    var regex = new RegExp(req.params.Blood_Group,'i');
    Blood_Request.find({Blood_Group:regex}).then((result)=>{
        res.status(200).json(result)
    })
})


module.exports= router;