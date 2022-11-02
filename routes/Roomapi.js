const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Room = require('../models/rooms');

const { schema } = require('../models/rooms');
const res = require('express/lib/response');


require('../db/config');

const ChargeRates = require('../helper/policy');


router.route('/addroom').post(async(req,resp)=>{
    
    Room.init()
    const setid = new mongoose.Types.ObjectId();
   
    // Based on the Room Category define the charger per day.
    var chargerateperday = null;
    if ( req.body.category == 'common'){
        chargerateperday = ChargeRates.common;
    } else {
        chargerateperday = ChargeRates.vip;
    }
    
    const roomdata = new Room({
     _id: setid,
     category:req.body.category,
     chargeperday:chargerateperday,
     roomnumber:req.body.roomnumber
    });
    
    let result = await roomdata.save(); 
    resp.send(result);
 //      resp.send("recieved");
        
 })

 router.route('/allotroomtopatient/:id').patch(async(req,resp)=>{
       
    try {
            

        var dateTime =  new Date().toISOString().slice(0, 10);  

        var updates = req.body;
        updates["allotmentdate"] = dateTime;
        updates["status"] = "occupied";
        updates["patienid"] = req.body.patienid
        console.table(updates);
         const id = req.params.id;    
         const options = {new:true};
         let result = await Room.findByIdAndUpdate(id,updates,options); 
         console.log("🚀 ~ file: Roomapi.js ~ line 57 ~ router.route ~ result", result)
         
         if (result!=null){
             resp.status(200).json("Completed")
         } else {
            resp.status(404).json("Err")
         }
         
         

    } catch (err ){
        console.log(err);
        resp.status(404).json("Err")
    }
        
 })

 router.route('/dischargepatient/:id').patch(async(req,resp)=>{
       
    try {
            

        var dateTime =  new Date().toISOString().slice(0, 10);  

        var updates = req.body;
        updates["allotmentdate"] = dateTime;
        updates["status"] = "occupied";
        updates["patienid"] = req.body.patienid
        console.table(updates);
         const id = req.params.id;    
         const options = {new:true};
         let result = await Room.findByIdAndUpdate(id,updates,options); 
         console.log("🚀 ~ file: Roomapi.js ~ line 57 ~ router.route ~ result", result)
         
         if (result!=null){
             resp.status(200).json("Completed")
         } else {
            resp.status(404).json("Err")
         }
         
         

    } catch (err ){
        console.log(err);
        resp.status(404).json("Err")
    }
        
 })


router.route('/removeroom/:id').delete(async(req,resp)=>{
     
     const result = await Room.deleteOne({_id:req.params.id});
     console.log("result = ",result);
     resp.send(result);        
             
 })
 
router.route("/search/:id").get(function(req,res){
     var regex = new RegExp(req.params.id,'i');
     Room.find({id:regex}).then((result)=>{
         res.status(200).json(result)
     })
 })


 module.exports = router;