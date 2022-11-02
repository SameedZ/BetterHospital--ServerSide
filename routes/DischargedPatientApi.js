const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const DischargedPatient = require('../models/dischargedpatient');

const { schema } = require('../models/rooms');
const res = require('express/lib/response');


require('../db/config');




router.route('/add').post(async(req,resp)=>{
    console.log("api targeted")
    DischargedPatient.init()
    const setid = new mongoose.Types.ObjectId();
   
    // Based on the Room Category define the charger per day.
    const datedischarge = new Date().toISOString().slice(0, 10);
    
    const roomdata = new  DischargedPatient({
     _id: setid,
     patientid:req.body.patientid,
     roomid:req.body.roomid,
     dateofdischarge: datedischarge
    });
    
    let result = await roomdata.save();
    console.log("🚀 ~ file: DischargedPatientApi.js ~ line 32 ~ router.route ~ result", result)

        if(result != null) {
            resp.status(200).json("Completed")
        } else {
            resp.status(404).json("Err")
        }

        
 })







 module.exports = router;