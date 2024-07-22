const AcademicTerm = require("../../model/Academic/AcademicTerm")
const Admin = require("../../model/Staff/Admin")

//@desc Create Academic Term Year
//@route POST /api/v1/academic-terms
//@acess  Private
exports.createAcademicTerm = async (req, res) => {
    try {
        const { name, description, duration } = req.body;
        //check if exists
        const academicTerm = await AcademicTerm.findOne({ name });
        if (academicTerm) {
            throw new Error("Academic term already exists");
        }
        //create
        const academicTermCreated = new AcademicTerm({
            name,
            description,
            duration,
            createdBy: req.user._id,
        })
        await academicTermCreated.save()
        //push academic into admin
        const admin = await Admin.findById(req.user._id)
        admin.academicTerms.push(academicTermCreated._id)
        await admin.save()
        res.status(201).json({
            status: "success",
            message: "Academic term created successfully",
            data: academicTermCreated,
        })
    } catch (error) {
        res.status(400).json({
            status: "fails",
            message: error.message
        })
    }
}

//@desc  get all Academic terms
//@route GET /api/v1/academic-terms
//@acess  Private
exports.getAcademicTerms = async (req, res) => {
    try {
        const academicTerms = await AcademicTerm.find()

        res.status(200).json({
            status: "success",
            message: "Academic terms fetched successfully",
            data: academicTerms,
        })
    } catch (error) {
        res.status(400).json({
            status: "success",
            message: error.message,
        })
    }
}

//@desc  get single Academic term
//@route GET /api/v1/academic-terms/:id
//@acess  Private
exports.getAcademicTerm = async (req, res) => {
    try {
        const academicTerms = await AcademicTerm.findById(req.params.id)

        res.status(201).json({
            status: "success",
            message: "Academic terms fetched successfully",
            data: academicTerms,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Update  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private
exports.updateAcademicTerms = async (req, res) => {
    try {
        const { name, description, duration } = req.body
        //check name exists
        const createAcademicTermFound = await AcademicTerm.findOne({ name })
        if (createAcademicTermFound) {
            throw new Error("Academic terms= already exists")
        }
        const academicTerms = await AcademicTerm.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                duration,
                createdBy: req.user._id,
            },
            {
                new: true,
            }
        )
    
        res.status(200).json({
            status: "success",
            message: "Academic term updated successfully",
            data: academicTerms,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Delete  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private
exports.deleteAcademicTerm = async (req, res) => {
    try {
        await AcademicTerm.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: "Academic term deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "fails",
            message: error.message
        })
    }
}
