const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
let AssessmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    doctorid:   {type:String ,required:true},
    patientid:  {type:String,required:true},
    diagnosisText:{type:String,required:true},
    diagnosisImg:   {type:String,default:"NULL"},
    date:  {type:String,required:true},

    },{
    versionKey: false // You should be aware of the outcome after set to false 
});  
module.exports = mongoose.model('assessments',AssessmentSchema );