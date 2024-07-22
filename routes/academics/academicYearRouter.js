const express = require("express")
const app = require("../../app/app")

const { createAcademicYear, getAllAcademicYears, getAcademicYear, updateAcademicYear, deleteAcademicYear } = require('../../controller/academics/academicYearCtrl')
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")


const academicYearRouter = express.Router()

academicYearRouter.post("/", isloggin, isAdmin, createAcademicYear)
academicYearRouter.get("/", isloggin, isAdmin, getAllAcademicYears)
academicYearRouter.get("/:id", isloggin, isAdmin, getAcademicYear)
academicYearRouter.patch("/:id", isloggin, isAdmin, updateAcademicYear)
academicYearRouter.delete("/:id", isloggin, isAdmin, deleteAcademicYear)

module.exports = academicYearRouter