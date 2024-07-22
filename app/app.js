const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectRouter = require("../routes/academics/subject");
const yearGroupRouter = require("../routes/academics/yearGroup");
const teacherRouter = require("../routes/staff/teacher");
const examRouter = require("../routes/academics/exam");
const studentRouter = require("../routes/academics/student");
const questionRouter = require("../routes/academics/question");
const examResultsRouter = require("../routes/academics/examResultRouter");

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //pass incoming json data

//Routes
//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/yeargroups", yearGroupRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/exam-results", examResultsRouter)

module.exports = app;
