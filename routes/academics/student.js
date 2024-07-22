const express = require("express");
const isloggin = require("../../middlewares/isLoggin");
const isAdmin = require("../../middlewares/isAdmin");
const { registerStudentCtrl, studentLogging, adminGetAllStudents, adminGetSingleAdmin, getStudentProfile, updateStudentProfile, adminUpdateStudent, studentWriteExam } = require("../../controller/academics/student");
const isStudent = require("../../middlewares/isStudent");
const isStudentLoggin = require("../../middlewares/isStudentLoggin");



const studentRouter =express.Router()


studentRouter.post('/admin/register', isloggin, isAdmin, registerStudentCtrl)
studentRouter.post('/login', studentLogging)
studentRouter.get('/admin', isloggin, isAdmin, adminGetAllStudents)
studentRouter.get('/:studentID/admin', isloggin, isAdmin, adminGetSingleAdmin)
studentRouter.get('/profile', isStudentLoggin, isStudent, getStudentProfile)
studentRouter.patch('/profile', isStudentLoggin, isStudent, updateStudentProfile)
studentRouter.patch('/:studentID/admin/update', isloggin, isAdmin, adminUpdateStudent)


//student wite exam route
studentRouter.post('/:examID/write',isStudentLoggin, isStudent, studentWriteExam)

module.exports = studentRouter