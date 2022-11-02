const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Doctor = require('../models/doctors');
const { schema } = require('../models/doctors');
const res = require('express/lib/response');


require('../db/config');

router.route('/add').post(async(req,resp)=>{
    
    console.log("api targeted")

    Doctor.init()
    const setid = new mongoose.Types.ObjectId();
   
 
    const doctordata = new Doctor({
     _id: setid,
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     CNIC:req.body.CNIC,
     phone:req.body.phone,
     age:req.body.age,
     gender:req.body.gender,
     dob:req.body.dob ,
     bachelor_edu: req.body.bachelor_edu,
     masters_edu:req.body.masters_edu
    });
    
    let result = await doctordata.save(); 
    if (result!=null){
        resp.status(200).json("Completed")
    } else {
        resp.status(404).json("Err")
    }
    
        
 })
 
router.route('/removedoctor/:id').delete(async(req,resp)=>{
     
     const result = await Doctor.deleteOne({_id:req.params.id});
     console.log("result = ",result);
     resp.send(result);        
             
 })
 
router.route("/search/:firstname").get(function(req,res){
   
   //const headercontent = req.header();
  // console.log("🚀 ~ file: Doctorapi.js ~ line 48 ~ router.route ~  headercontent",  headercontent)
   
    res.setMaxListeners

    var regex = new RegExp(req.params.firstname,'i');
     Doctor.find({firstname:regex}).then((result)=>{
         res.status(200).json(result)
     })
 })


 module.exports = router;