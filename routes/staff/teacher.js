const express = require("express");
const { registerTeacherCtrl, loginTeacherCtrl, getTeachersCtrl, getTeacherCtrl, getTeachersbyAdminCtrl, getTeacherbyAdminCtrl, updateTeacherCtrl, adminUpdateTeacher } = require("../../controller/staff/teacher");
const isloggin = require("../../middlewares/isLoggin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherloggin = require("../../middlewares/isTeacherLogging");
const isTeacher = require("../../middlewares/isTeacher");
const advancedResults = require("../../middlewares/advancedResults");
const Teacher = require("../../model/Staff/Teacher");
const isAuthanticate = require("../../middlewares/isAuthantication");
const Admin = require("../../model/Staff/Admin");
const { roleRestriction } = require("../../middlewares/roleRestrict");

const teacherRouter = express.Router();


teacherRouter.post("/admin/register",isAuthanticate(Admin), isAdmin, registerTeacherCtrl)
teacherRouter.post("/login", loginTeacherCtrl)
teacherRouter.get("/admin", isAuthanticate(Admin), roleRestriction('admin'), advancedResults(Teacher, [{path :'examsCreated',populate: {path : 'questions'}},{path: 'subject'}]),getTeachersbyAdminCtrl)
teacherRouter.get("/:teacherID/admin", isloggin, isAdmin, getTeacherbyAdminCtrl)
teacherRouter.get("/profile", isAuthanticate(Teacher), isTeacher, getTeacherCtrl)
teacherRouter.patch("/profile", isTeacherloggin, isTeacher, updateTeacherCtrl)
teacherRouter.patch("/:teacherID/admin/update", isloggin, isAdmin, adminUpdateTeacher)
module.exports = teacherRouter