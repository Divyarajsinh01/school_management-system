const express = require("express")
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")
const { createSubjects, getSubjects, getSubject, updateSubject, deleteSubject } = require("../../controller/academics/subject")



const subjectRouter = express.Router()

subjectRouter.post('/:programID', isloggin, isAdmin, createSubjects)
subjectRouter.get('/', isloggin, isAdmin, getSubjects)
subjectRouter.get('/:id', isloggin, isAdmin, getSubject)
subjectRouter.patch('/:id', isloggin, isAdmin, updateSubject)
subjectRouter.delete('/:id', isloggin, isAdmin, deleteSubject)

module.exports = subjectRouter