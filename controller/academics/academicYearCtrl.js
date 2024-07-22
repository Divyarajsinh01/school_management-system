const AcademicYear = require('../../model/Academic/AcademicYear')
const Admin = require("../../model/Staff/Admin")


//@desc Create Academic Year
//@route POST /api/v1/academic-years
//@acess  Private
exports.createAcademicYear = async (req, res) => {
    try {
        const { name, fromYear, toYear, createdBy } = req.body

        const isAcademicYear = await AcademicYear.findOne({ name })
        if (isAcademicYear) {
            return res.status(400).json({
                status: 'fail',
                message: "This academic year already exists"
            })
        }
        const academicYear = new AcademicYear({
            name,
            fromYear,
            toYear,
            createdBy: req.user._id
        })

        await academicYear.save()

        const admin = await Admin.findById(req.user._id)
        admin.academicYears.push(academicYear._id)

        admin.save()

        res.status(201).json({
            status: 'success',
            data: academicYear,
            message: 'academic year added'
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

//@desc  get all Academic Years
//@route GET /api/v1/academic-years
//@acess  Private
exports.getAllAcademicYears = async (req, res) => {
    try {
        const acadimcyears = await AcademicYear.find()
        res.status(200).json({
            status: "succes",
            data: acadimcyears,
            message: "all acedemicYear"
        })
    } catch (error) {
        res.status(404).json({
            status: "fails",
            message: error.message
        })
    }
}


//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.getAcademicYear = async (req, res) => {
    try {
        const academicYears = await AcademicYear.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Academic years fetched successfully",
            data: academicYears,
        });
    } catch (error) {
        res.status(404).json({
            status: 'fails',
            message: error.message
        })
    }
}


//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.updateAcademicYear = async (req, res) => {
    try {
        const { name, fromYear, toYear } = req.body
        const createAcademicYearFound = await AcademicYear.findOne({ name })

        if (createAcademicYearFound) {
            return res.status(400).json({
                status: "fail",
                message: "Academic year already exists"
            })
        }

        const academicYear = await AcademicYear.findByIdAndUpdate(
            req.params.id,
            { name, fromYear, toYear, createdBy: req.user._id },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            status: "success",
            message: "Academic years updated successfully",
            data: academicYear,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.deleteAcademicYear = async (req, res) => {
    try {
        const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: academicYear,
            message: "Academic year deleted successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
