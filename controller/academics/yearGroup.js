const YearGroup = require('../../model/Academic/YearGroup');
const Admin = require('../../model/Staff/Admin');

//@desc  Create yeargroup
//@route POST /api/v1/yeargrops
//@acess  Private
exports.createYearGroups = async (req, res) => {
    try {
        const { name, academicYear } = req.body;
        
        //check if exists
        const yearGroupFound = await YearGroup.findOne({ name });
        if (yearGroupFound) {
            throw new Error("yearGroup already exists");
        }
        //create
        const yearGroupCreated = new YearGroup({
            name,
            academicYear,
            createdBy: req.user._id,
        })
        await yearGroupCreated.save()
        //push to the admin

        const admin = await Admin.findById(req.user._id)

        admin.yearGrops.push(yearGroupCreated._id)
        
        await admin.save()
        res.status(201).json({
            status: "success",
            message: "yearGroup created successfully",
            data: yearGroupCreated,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc  get all yearGroup
//@route GET /api/v1/yearGroups
//@acess  Private

exports.getyearGroups = async (req, res) => {
    try {
        const classes = await YearGroup.find()

        res.status(200).json({
            status: "success",
            message: "yearGroup fetched successfully",
            data: classes,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        })
    }
}

//@desc  get single yearGroup
//@route GET /api/v1/yearGroups/:id
//@acess  Private
exports.getyearGroup = async (req, res) => {
    try {
        const progarams = await YearGroup.findById(req.params.id)

        res.status(201).json({
            status: "success",
            message: "yearGroup fetched successfully",
            data: progarams,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Update yearGroup
//@route  PUT /api/v1/yeargroups/:id
//@acess  Private

exports.updateyearGroups = async (req, res) => {
    try {
        const { name, academicYear } = req.body
        //check name exists
        const subjectFound = await YearGroup.findOne({ name })
        if (subjectFound) {
            throw new Error("yearGroup already exists")
        }
        const subject = await YearGroup.findByIdAndUpdate(
            req.params.id,
            {
                name,
                academicYear,
                createdBy: req.user._id,
            },
            {
                new: true,
            }
        )

        res.status(200).json({
            status: "success",
            message: "yearGroup updated successfully",
            data: subject,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Delete  yearGroup
//@route  PUT /api/v1/yeargroups/:id
//@acess  Private
exports.deleteYearGroup = async (req, res) => {
    try {
        await YearGroup.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: "yearGroup deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "fails",
            message: error.message
        })
    }
}
