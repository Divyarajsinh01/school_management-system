const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");

//@desc  Create Class Level
//@route POST /api/v1/class-levels
//@acess  Private
exports.createClassLevel = async (req, res) => {
    try {
        const { name, description, duration } = req.body
        //check if exists
        const classFound = await ClassLevel.findOne({ name })
        if (classFound) {
            throw new Error("Class  already exists")
        }
        //create
        const classCreated = new ClassLevel({
            name,
            description,
            createdBy: req.user._id,
        })

        await classCreated.save()
        //push class into admin
        const admin = await Admin.findById(req.user._id)
        admin.classLevels.push(classCreated._id)
        //save
        await admin.save()

        res.status(201).json({
            status: "success",
            message: "Class created successfully",
            data: classCreated,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc  get all class levels
//@route GET /api/v1/class-levels
//@acess  Private
exports.getClassLevels = async (req, res) => {
    try {
        const classes = await ClassLevel.find()
        res.status(201).json({
            status: "success",
            message: "Class Levels fetched successfully",
            data: classes,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc  get single Class level
//@route GET /api/v1/class-levels/:id
//@acess  Private
exports.getClassLevel = async (req, res) => {
    try {
        const classLevel = await ClassLevel.findById(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Class fetched successfully",
            data: classLevel,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }

}

//@desc   Update  Class Level
//@route  PUT /api/v1/class-levels/:id
//@acess  Private

exports.updateclassLevel = async (req, res) => {
    try {
        const { name, description } = req.body
        //check name exists
        const classFound = await ClassLevel.findOne({ name })
        if (classFound) {
            throw new Error("Class already exists")
        }
        const classLevel = await ClassLevel.findByIdAndUpdate(
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
            message: "Class  updated successfully",
            data: classLevel,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Delete  class level
//@route  PUT /api/v1/aclass-levels/:id
//@acess  Private
exports.deleteClassLevel = async (req, res) => {
    try {
        await ClassLevel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Class level deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
