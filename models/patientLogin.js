const mongoose = require('mongoose');
let Patient_Login_Schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    User_ID:String, // Could be E-Mail or Phone Number.
    Password:String
});
module.exports = mongoose.model('pateintLogin',Patient_Login_Schema);