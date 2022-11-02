const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

let RoomSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    category:{type:String ,default:"common"},
    chargeperday:{type:Number ,default:2000},
    roomnumber:{type:Number, required:true},
    allotmentdate:{type:Date, default:null},
    patientid:{type:String, default:null },
    doctorid:{type:String, default:null },
    nurseid:{type:String, default:null },
    status:{type:String,default:'vacant'}

    
},{
    versionKey: false // You should be aware of the outcome after set to false 
});
module.exports = mongoose.model('rooms',RoomSchema);