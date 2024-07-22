const Program = require("../../model/Academic/Program")
const Admin = require("../../model/Staff/Admin")

//@desc  Create Program
//@route POST /api/v1/programs
//@acess  Private
exports.createProgram = async (req, res) => {
    try {
        const { name, description } = req.body;
        //check if exists
        const program = await Program.findOne({ name });
        if (program) {
            throw new Error("Progaram already exists");
        }
        //create
        const progarmCreated = new Program({
            name,
            description,
            createdBy: req.user._id,
        })
        await progarmCreated.save()
        //push academic into admin
        const admin = await Admin.findById(req.user._id)
        admin.academicTerms.push(progarmCreated._id)
        await admin.save()
        res.status(201).json({
            status: "success",
            message: "Progaram created successfully",
            data: progarmCreated,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc  get all Programs
//@route GET /api/v1/programs
//@acess  Private
exports.getProgarams = async (req, res) => {
    try {
        const classes = await Program.find()

        res.status(200).json({
            status: "success",
            message: "progarms fetched successfully",
            data: classes,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        })
    }
}

//@desc  get single Program
//@route GET /api/v1/programs/:id
//@acess  Private
exports.getprogaram = async (req, res) => {
    try {
        const progarams = await Program.findById(req.params.id)

        res.status(201).json({
            status: "success",
            message: "Progaram fetched successfully",
            data: progarams,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Update  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private

exports.updatePrograms = async (req, res) => {
    try {
        const { name, description } = req.body
        //check name exists
        const createProgaramFound = await Program.findOne({ name })
        if (createProgaramFound) {
            throw new Error("Progaram already exists")
        }
        const programs = await Program.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                createdBy: req.user._id,
            },
            {
                new: true,
            }
        )
    
        res.status(200).json({
            status: "success",
            message: "Program updated successfully",
            data: programs,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Delete  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private
exports.deleteProgarams = async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: "Program deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "fails",
            message: error.message
        })
    }
}
