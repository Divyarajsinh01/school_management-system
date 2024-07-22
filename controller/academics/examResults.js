const ExamResult = require("../../model/Academic/ExamResults");
const Student = require('../../model/Academic/Student');
const Admin = require("../../model/Staff/Admin");

exports.getAllExamResults = async (req, res) => {
    try {
        const exam = await ExamResult.find().select('exam').populate('exam')

        res.status(200).json({
            status: "success",
            message: "all exam result",
            data: exam
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


//student check results

exports.checkResult = async (req, res) => {
    try {
        const studentFound = await Student.findById(req.user._id)

        if (!studentFound) {
            throw new Error('student not found')
        }

        const examResult = await ExamResult.findOne({
            studentID: studentFound?.studentId,
            _id: req.params.id
        }).populate({
            path: 'exam',
            populate: ({
                path: 'questions'
            })
        }).populate('classLevel').populate('academicTerm').populate('academicYear')

        if (examResult?.isPublished === false) {
            throw new Error('exam result not available, check out later')
        }

        res.status(200).json({
            status: "success",
            data: examResult,
            student: studentFound
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

//admin update examResults (published/unpublished)

exports.adminPublishResults = async (req, res) => {
    try {

        const examFound = await ExamResult.findById(req.params.id)
        if (!examFound) {
            throw new Error("Exam not Found")
        }
        //admin update results

        const publishResults = await ExamResult.findByIdAndUpdate(
            req.params.id,
            {
                isPublished: req.body.publish
            },
            {
                new: true
            })

        res.status(200).json({
            status: "success",
            data: publishResults
        })

    } catch (error) {
        res.status(400).json({
            status: "fali",
            message: error.message
        })
    }
}