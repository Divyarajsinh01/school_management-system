const Program = require("../../model/Academic/Program")
const Admin = require("../../model/Staff/Admin")
const Subject = require("../../model/Academic/Subject")

//@desc  Create subject
//@route POST /api/v1/subjects/:programID
//@acess  Private
exports.createSubjects = async (req, res) => {
    try {
        const { name, description, academicTerm } = req.body;
        //find the program
        const programFound = await Program.findById(req.params.programID);
        if (!programFound) {
            throw new Error("Program  not found");
        }
        //check if exists
        const subjectFound = await Subject.findOne({ name });
        if (subjectFound) {
            throw new Error("Subject  already exists");
        }
        //create
        const subjectCreated = new Subject({
            name,
            description,
            academicTerm,
            createdBy: req.user._id,
        })
        await subjectCreated.save()
        //push to the program
        programFound.subjects.push(subjectCreated._id);
        
        await programFound.save()
        res.status(201).json({
            status: "success",
            message: "Subject created successfully",
            data: subjectCreated,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc  get all Subjects
//@route GET /api/v1/subjects
//@acess  Private

exports.getSubjects = async (req, res) => {
    try {
        const classes = await Subject.find()

        res.status(200).json({
            status: "success",
            message: "Subjects fetched successfully",
            data: classes,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        })
    }
}

//@desc  get single subject
//@route GET /api/v1/subjects/:id
//@acess  Private
exports.getSubject = async (req, res) => {
    try {
        const progarams = await Subject.findById(req.params.id)

        res.status(201).json({
            status: "success",
            message: "Subjects fetched successfully",
            data: progarams,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Update  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private

exports.updateSubject = async (req, res) => {
    try {
        const { name, description, academicTerm } = req.body
        //check name exists
        const subjectFound = await Subject.findOne({ name })
        if (subjectFound) {
            throw new Error("subject already exists")
        }
        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                academicTerm,
                createdBy: req.user._id,
            },
            {
                new: true,
            }
        )

        res.status(200).json({
            status: "success",
            message: "subject  updated successfully",
            data: subject,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//@desc   Delete  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private
exports.deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: "Subject deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: "fails",
            message: error.message
        })
    }
}
