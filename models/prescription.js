const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
let PrescriptionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    prescriptionImg:   {type:String ,required:true},
    
    // if patient visited then only he can give rating + review && Doctor sets the patient visited option.
    },{
    versionKey: false // You should be aware of the outcome after set to false 
});  
module.exports = mongoose.model('prescription',PrescriptionSchema);