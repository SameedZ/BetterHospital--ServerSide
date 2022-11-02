const express = require("express");
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const {
  upload,
  fileFilter,
  storage,
  multer,
} = require("../helper/fileuploading.js");
const Assessment = require("../models/assessment");
require("../db/config");
require("../helper/fileuploading.js");

router.route("/add").post(async (req, resp) => {
  try {
    const date = new Date().toString();

    console.table(req.body);

    Assessment.init();
    const setid = new mongoose.Types.ObjectId();

    const assessmentdata = new Assessment({
      _id: setid,
      doctorid: req.body.doctorid,
      patientid: req.body.patientid,
      date: date,
      diagnosisText: req.body.diagnosisText,
    });
    //console.table(appointmentdata);

    let result = await assessmentdata.save();

    resp.status(200).json("Completed");
    //console.table(result);
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.patch(
  "/adddiagnosisimg/:_id",
  upload.single("diagnosisImg"),
  async (req, resp, next) => {
    try {
      console.log("api targeted");
      const id = req.params._id;

      console.log("filepath", req.file.path);
      var updates = {};
      updates["diagnosisImg"] = req.file.path;
      const options = { new: true };
      let result = await Assessment.findByIdAndUpdate(id, updates, options);
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

module.exports = router;
