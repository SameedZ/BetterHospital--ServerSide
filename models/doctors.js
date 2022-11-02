const mongoose = require('mongoose');
let doctorsSchema = new mongoose.Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String ,require:true},
    lastname:{type:String ,require:true},
    CNIC:{type:String ,require:true},
    phone:{type:String ,require:true},
    age:{type:String , require:true}, 
    gender:{type:String ,require:true},
    dob:{type:String ,require:true},
    bachelor_edu : {type:String ,require:true},
    masters_edu : {type:String,default:null }
},{
     versionKey: false // You should be aware of the outcome after set to false 
})

module.exports = mongoose.model('doctors',doctorsSchema);