const express = require('express')
const { getAllExamResults, checkResult, adminPublishResults } = require('../../controller/academics/examResults')
const isStudentLoggin = require('../../middlewares/isStudentLoggin')
const isStudent = require('../../middlewares/isStudent')
const isloggin = require('../../middlewares/isLoggin')
const isAdmin = require('../../middlewares/isAdmin')

const examResultsRouter = express.Router()


examResultsRouter.get('/',isStudentLoggin,isStudent, getAllExamResults)
examResultsRouter.get('/:id/check', isStudentLoggin, isStudent, checkResult)
examResultsRouter.patch('/:id', isloggin, isAdmin, adminPublishResults)

module.exports = examResultsRouter