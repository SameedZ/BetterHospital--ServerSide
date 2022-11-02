const mongoose = require('mongoose');
let Blood_Request_Schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    patient_id:{type: mongoose.Schema.Types.ObjectId, ref: 'patients', required:true},
    Blood_Group:{type:String,required:true},
    Quantity_inML:{type:Number,required:true},
},{
    versionKey:false
});
module.exports = mongoose.model('blood_requests',Blood_Request_Schema);     

