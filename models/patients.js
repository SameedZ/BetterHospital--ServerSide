const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
let PatientSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String,required: true},
    lastname:{type:String,required: true},
    CNIC:{type:String,required: true},
    phone:{type:String,required: true},
    age:{type:String,required: true},
    gender:{type:String,required: true},
    dob:{type:String,required: true},
    admit:{type:Boolean, default:false}
});
module.exports = mongoose.model('patients',PatientSchema);