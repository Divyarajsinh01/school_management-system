const express = require("express")
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")
const { createAcademicTerm, getAcademicTerms, getAcademicTerm, updateAcademicTerms, deleteAcademicTerm } = require("../../controller/academics/academicTermCtrl")

const academicTermRouter = express.Router()

academicTermRouter.post('/', isloggin, isAdmin, createAcademicTerm)
academicTermRouter.get('/', isloggin, isAdmin, getAcademicTerms)
academicTermRouter.get('/:id', isloggin, isAdmin, getAcademicTerm)
academicTermRouter.patch('/:id', isloggin, isAdmin, updateAcademicTerms)
academicTermRouter.delete('/:id', isloggin, isAdmin, deleteAcademicTerm)

module.exports = academicTermRouter