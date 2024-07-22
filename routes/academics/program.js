const express = require("express")
const isloggin = require("../../middlewares/isLoggin")
const isAdmin = require("../../middlewares/isAdmin")
const { createProgram, getProgarams, getprogaram, updatePrograms, deleteProgarams } = require("../../controller/academics/program")


const programRouter = express.Router()

programRouter.post('/', isloggin, isAdmin, createProgram)
programRouter.get('/', isloggin, isAdmin, getProgarams)
programRouter.get('/:id', isloggin, isAdmin, getprogaram)
programRouter.patch('/:id', isloggin, isAdmin, updatePrograms)
programRouter.delete('/:id', isloggin, isAdmin, deleteProgarams)

module.exports = programRouter