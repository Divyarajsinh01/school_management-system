const express = require('express')
const isTeacherloggin = require('../../middlewares/isTeacherLogging')
const isTeacher = require('../../middlewares/isTeacher')
const { createQuestions, getAllQuestions, getSigleQuestion, updateQuestion } = require('../../controller/academics/question')


const questionRouter = express.Router()

questionRouter.post('/:examID',isTeacherloggin, isTeacher, createQuestions)
questionRouter.get('/', isTeacherloggin, isTeacher, getAllQuestions)
questionRouter.get('/:questionID', isTeacherloggin, isTeacher, getSigleQuestion)
questionRouter.patch('/:questionID', isTeacherloggin, isTeacher, updateQuestion)


module.exports = questionRouter