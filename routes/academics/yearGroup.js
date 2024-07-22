const express = require("express")
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")
const { createYearGroups, getyearGroups, getyearGroup, updateyearGroups, deleteYearGroup } = require("../../controller/academics/yearGroup")



const yearGroupRouter = express.Router()

yearGroupRouter.post('/', isloggin, isAdmin, createYearGroups)
yearGroupRouter.get('/', isloggin, isAdmin, getyearGroups)
yearGroupRouter.get('/:id', isloggin, isAdmin, getyearGroup)
yearGroupRouter.patch('/:id', isloggin, isAdmin, updateyearGroups)
yearGroupRouter.delete('/:id', isloggin, isAdmin, deleteYearGroup)

module.exports = yearGroupRouter