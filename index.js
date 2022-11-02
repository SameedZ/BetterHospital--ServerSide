// Including the Express Server
const express = require('express');
const app = express();
// Including cors
const cors = require("cors"); 
// Server Usage
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static('uploads'));

// Connecting to the MongoDb Atlas database
require('./db/config');

// Importing All Router Api's
var NurseApis = require('./routes/Nurseapi');
var BloodRequestApis = require('./routes/Bloodrequestapi');
var DoctorApis = require('./routes/Doctorapi');
var PatientApis = require('./routes/Patientsapi');
var RoomApis = require('./routes/Roomapi');
var AppointmentApis = require('./routes/Appointmentapi');
var PatientLoginApis = require('./routes/PatientLoginapi')
var DoctorLoginApis = require('./routes/DoctorLoginapi')
var RadiologyTest = require('./routes/Radiologyapi')
var PrescriptionApis =require('./routes/PrescriptionApi')
var AssessmentApis = require('./routes/Assessmentapi');
var DischargedPatient = require('./routes/DischargedPatientApi')

// Routed Api
app.use("/uploads",express.static('uploads'));
app.use('/Nurse',NurseApis);
app.use('/Doctor',DoctorApis);
app.use('/BloodRequest',BloodRequestApis);
app.use('/Patient',PatientApis);
app.use('/Room',RoomApis);
app.use('/Appointment',AppointmentApis);
app.use('/Assessment',AssessmentApis);
app.use('/PatientLogin',PatientLoginApis)
app.use('/DoctorLogin',DoctorLoginApis)
app.use('/Radiology',RadiologyTest)

app.use("/Prescription",PrescriptionApis)
app.use("/Discharge",DischargedPatient)

// listening @ 5000 port
app.listen(5000);