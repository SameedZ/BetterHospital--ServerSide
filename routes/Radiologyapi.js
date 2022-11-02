const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Radiology = require("../models/radiology");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();

require("../db/config");
const { chargeRadiology } = require("../helper/policy");

router.route("/add").post(jsonparser, function (req, res) {
  const chargevalue = chargeRadiology[req.body.radiology_type];
  if (!chargevalue) {
    res.status(404).json("Error");
  }


  const date = new Date().toISOString().slice(0, 10)

  const Radiology_Data = new Radiology({
    _id: new mongoose.Types.ObjectId(),
    patientid: req.body.patientid,
    radiology_type: req.body.radiology_type,
    charges: chargevalue,
    dated: date,
  });

  Radiology_Data.save()
    .then((result) => {
      console.warn(result);
      res.status(200).json("Completed");
    })
    .catch((err) => {
      console.warn(err);
      res.status(404).json("Error");
    });
});

router.route("/removeRadiologyTest/:Patient_ID").delete(function (req, res) {
  Radiology.deleteOne({ Patient_ID: req.params.Patient_ID })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
});

router.route("/search/:Patient_ID").get(function (req, res) {
  var regex = new RegExp(req.params.Patient_ID, "i");
  Radiology.find({ Patient_ID: regex }).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
