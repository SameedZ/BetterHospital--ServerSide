const express = require("express");
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Appointment = require("../models/appointments");
require("../db/config");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File Type not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.route("/add").post(async (req, resp) => {
  try {
    const date = new Date().toISOString().slice(0, 10);

    console.table(req.body);

    Appointment.init();
    const setid = new mongoose.Types.ObjectId();

    const appointmentdata = new Appointment({
      _id: setid,
      doctorid: req.body.doctorid,
      patientid: req.body.patientid,
      status: "active",
      date: date,
      starttime: req.body.startime,
      endtime: req.body.endtime,
    });
    //console.table(appointmentdata);

    let result = await appointmentdata.save();

    resp.status(200).json("Completed");
    //console.table(result);
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/recentappointments").get(async (req, res) => {
  try {
    Appointment.find({})
      .sort({ x: -1 })
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      });
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/todaysappointments").get(async (req, res) => {
  try {
    console.log("Today's Api Targeted");
    let today = new Date().toISOString().slice(0, 10);

    Appointment.find({ date: today })
      .sort({ x: -1 })
      .then((result) => {
        console.log(result, typeof result);

        if (result.length !== 0) {
          console.log("here....");
          res.status(200).json(result);
          console.log(result);
        } else {
          console.log("here 2....");
          res.status(404).json("Err");
        }
      });
  } catch (err) {
    console.warn(err);
    res.status(404).json("Err"); // Sending res to client some err occured.
  }
});

// Api for getting total appointments booked against a doctor in the current month
router.route("/totalappointments/doctor/:docid").get(async (req, res) => {
  try {
    Appointment.find({ doctorid: req.params.docid })
      .count()
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      });
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/todaysappointments/doctor/:docid").get(async (req, res) => {
  try {
    // var today = new Date();
    let today = new Date().toISOString().slice(0, 10);
    console.log(today);
    //today='2022-05-15'
    //console.log(today)
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds
    //res.send(today)

    // $and: [{ age: { $gt: 2 } }, { age: { $lte: 4 } }]
    // {date:today}

    Appointment.find({
      $and: [{ date: today }, { doctorid: req.params.docid }],
    })
      .sort({ x: -1 })
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      });
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

// Api for getting all appointments booked against a doctor in the current month
router.route("/totalappointments/doctor/:docid").get(async (req, res) => {
  try {
    Appointment.find({ doctorid: req.params.docid })
      .sort({ x: -1 })
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      });
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/appointments/patient/:patientid").get(async (req, res) => {
  try {
    Appointment.find({ patientid: req.params.patientid })
      .sort({ x: -1 })
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      });
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }

});

router.route("/cancelappointment/:id").patch(async (req, resp) => {
  const id = req.params.id;

  var updates = {};
  updates["status"] = "cancelled";

  const options = { new: true };

  await Appointment.findByIdAndUpdate(id, updates, options)
    .then((res) => {
      console.log(res);
      if (res.length != 0 || res != null) {
        resp.status(200).json("Completed");
      }
    })
    .catch((err) => {
      resp.status(200).json("Err");
    });
});

router.patch(
  "/addprescription/:_id",
  upload.single("prescriptionImg"),
  async (req, resp, next) => {
    try {
      console.log("api targeted");
      const id = req.params._id;

      console.log("filepath", req.file.path);
      var updates = {};
      updates["prescriptionImg"] = req.file.path;
      const options = { new: true };
      let result = await Appointment.findByIdAndUpdate(id, updates, options);
      if (!result) {
        resp.status(404).json("Err");
      } else {
        resp.status(200).json("Completed");
      }
    } catch (err) {
      console.warn(err);
      resp.status(404).json("Err"); // Sending res to client some err occured.
    }
  }
);

router.route("/searchMyAllAppointments/:Patient_ID").get(function (req, res) {
  var regex = new RegExp(req.params.Patient_ID, "i");
  Appointment.find({ Patient_ID: regex }).then((result) => {
    res.status(200).json(result);
    console.log(result);
  });
});

module.exports = router;
