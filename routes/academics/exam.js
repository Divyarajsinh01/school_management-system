const express = require("express");
const isTeacherloggin = require("../../middlewares/isTeacherLogging");
const isTeacher = require("../../middlewares/isTeacher");
const { createExam, getAllExam, getExam, updateExam } = require("../../controller/academics/exam");

const examRouter = express.Router();


examRouter.post("/", isTeacherloggin, isTeacher, createExam)
examRouter.get("/", isTeacherloggin, isTeacher, getAllExam)
examRouter.route("/:examID", isTeacherloggin, isTeacher).get(getExam).patch(updateExam)


module.exports = examRouter