const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

let DischargedPatientSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

    patientid:{type:String, required:true },
    roomid:{type:String, required:true },    
    dateofdischarge:{type:String,required:true},
    
    
},{
    versionKey: false // You should be aware of the outcome after set to false 
});
module.exports = mongoose.model('dischargedpatients',DischargedPatientSchema);