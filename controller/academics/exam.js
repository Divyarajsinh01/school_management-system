const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");


//create exam 
exports.createExam = async (req, res) => {
    try {

        const {
            name,
            description,
            subject,
            program,
            academicTerm,
            examTime,
            classLevel,
            academicYear } = req.body

        const examFound = await Exam.findOne({ name })

        if (examFound) {
            throw new Error("exam already created!")
        }

        const createdExam = new Exam({
            name,
            description,
            subject,
            program,
            academicTerm,
            classLevel,
            academicYear,
            examTime,
            createdBy: req?.user?._id
        })

        // console.log(createdExam)
        await createdExam.save()

        const teacher = await Teacher.findById(req.user._id)

        teacher.examsCreated.push(createdExam._id)

        await teacher.save()

        res.status(201).json({
            status: "success",
            data: createdExam,
            message: "exam created successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//get all exam

exports.getAllExam = async (req, res) => {
    try {
        const exam = await Exam.find().populate("questions")

        res.status(200).json({
            status: "success",
            message: "get all exam data",
            data: exam
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

//get signle exam 

exports.getExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examID).populate("questions")

        res.status(200).json({
            status: "success",
            message: "exam fetch successFully",
            data: exam
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}


//update exam

exports.updateExam = async (req, res) => {
    try {
        const {
            name,
            description,
            subject,
            program,
            academicTerm,
            examTime,
            classLevel,
            academicYear
        } = req.body
       
        const examFound = await Exam.findOne({ name })

        if (examFound) {
            throw new Error("exam already exists!")
        }

        //create an object of fields to update
    
        const examUpdated = await Exam.findByIdAndUpdate(
            req.params.examID,
            {
                name,
                description,
                subject,
                program,
                academicTerm,
                examTime,
                classLevel,
                academicYear,
                createdBy: req?.user?._id,
            },
            {
                new: true,
            }
        );

        // console.log(examUpdated)

        res.status(200).json({
            status: "success",
            data: examUpdated,
            message: "exam updated successfully"
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

