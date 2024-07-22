const express = require("express")
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")
const { createClassLevel, getClassLevels, getClassLevel, updateclassLevel, deleteClassLevel } = require("../../controller/academics/classLevelCtrl")


const classLevelRouter = express.Router()

classLevelRouter.post('/', isloggin, isAdmin, createClassLevel)
classLevelRouter.get('/', isloggin, isAdmin, getClassLevels)
classLevelRouter.get('/:id', isloggin, isAdmin, getClassLevel)
classLevelRouter.patch('/:id', isloggin, isAdmin, updateclassLevel)
classLevelRouter.delete('/:id', isloggin, isAdmin, deleteClassLevel)

module.exports = classLevelRouter