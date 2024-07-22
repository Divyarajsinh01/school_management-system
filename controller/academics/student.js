const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");
const Admin = require("../../model/Staff/Admin");
const { ganerateAuth } = require("../../utils/ganerateAuth");

//@desc admin register teacher
//@route POST /api/teachers/admin/register
//@acess  Private
exports.registerStudentCtrl = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const admin = await Admin.findById(req.user._id)
        if(!admin){ 
            throw new Error("admin not found")
        }

        const studentFound = await Student.findOne({ email })
        if (studentFound) {
            return res.status(400).json("student already Exists");
        }
        //register
        const user = new Student({
            name,
            email,
            password,
        })

        await user.save()

        admin.students.push(user._id)
        await admin.save()

        res.status(201).json({
            status: "success",
            data: user,
            message: 'Admin register student successfully!'
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message,
        });
    }
};


//student logging

exports.studentLogging = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Student.findByCredentials(email, password)
        const token = await ganerateAuth(user._id)

        res.status(200).json({
            status: 'success',
            data: user,
            token,
            message: "student logging successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: "fali",
            message: "unable to login"
        })
    }
}


//admin get all student

exports.adminGetAllStudents = async (req, res) => {
    try {
        const user = await Student.find().select('-password -createdAt -updatedAt')

        res.status(200).json({
            status: "succes",
            data: user,
            message: "admin get all data of user"
        })
    } catch (error) {
        res.status(400).json({
            status: "fali",
            message: "unable get student"
        })
    }
}


exports.adminGetSingleAdmin = async (req, res) => {
    try {
        const user = await Student.findById(req.params.studentID).select('-password -createdAt -updatedAt')

        res.status(200).json({
            status: "succes",
            data: user,
            message: "admin get student"
        })

    } catch (error) {
        res.status(400).json({
            status: "fali",
            message: error.message
        })
    }
}

exports.getStudentProfile = async (req, res) => {
    try {
        const user = await Student.findById(req.user._id).populate('examResults')

        // get student profile

        const studentProfile = {
            name: user?.name,
            email: user?.email,
            currentClassLevel: user?.currentClassLevel,
            program: user?.program,
            dateAdmitted: user?.dateAdmitted,
            isSuspended: user?.isSuspended,
            isWithdrawn: user?.isWithdrawn,
            studentID: user?.studentId,
            prefectName: user?.prefectName
        }

        // get exam results

        const examResults = user?.examResults

        //get current examResults

        const currentExamresult = examResults[examResults.length - 1]

        const isPublished = currentExamresult?.isPublished
        res.status(200).json({
            status: "succes",
            data: {
                studentProfile,
                examResults: isPublished ? currentExamresult : []
            },
            message: "User Profile Get Successfully!"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.updateStudentProfile = async (req, res) => {

    const { name, email, password } = req.body

    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password']

    const isValidUpdate = updates.every((update) => {
        return allowUpdates.includes(update)
    })

    if (!isValidUpdate) {
        throw new Error('invalid Update')
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.status(400).json({
            status: "succes",
            data: req.user,
            message: "student profile update successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.adminUpdateStudent = async (req, res) => {
    try {
        const { classLevels, academicYear, program, name, email, prefectName, isSuspended, isWithdrawn } = req.body

        const studentFound = await Student.findById(req.params.studentID)

        if (!studentFound) {
            throw new Error("Student not found")
        }

        const studentUpdate = await Student.findByIdAndUpdate(
            req.params.studentID,
            {
                $set: {
                    name,
                    email,
                    academicYear,
                    program,
                    prefectName,
                    isSuspended,
                    isWithdrawn
                },
                $addToSet: {
                    classLevels
                },
            }, {
            new: true
        }
        )

        res.status(200).json({
            status: "success",
            data: studentUpdate,
            message: "admin update student successfully!"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


//student write an exam

exports.studentWriteExam = async (req, res) => {
    try {

        const studentFound = await Student.findById(req.user._id)
        if (!studentFound) {
            throw new Error('student not found')
        }

        const examFound = await Exam.findById(req.params.examID)
            .populate("questions")
            .populate("academicTerm")

        if (!examFound) {
            throw new Error('exam not found')
        }

        //check if student is suspend or withran or not

        if (studentFound.isSuspended || studentFound.isWithdrawn) {
            throw new Error('student suspent/withrawn, cannot write exam')
        }

        const questions = examFound?.questions
        const studentAnswer = req.body.answer

        const studentAttendExam = await ExamResult.findOne({ student: studentFound?._id })

        if (studentAttendExam) {
            throw new Error('you have already witten an Exam!')
        }

        let totalQuestions = 0
        let rightAnswer = 0
        let WrongeAnswer = 0
        let score = 0
        let grade = 0
        let answeredQuestions = []
        let status = ''
        let remarks = ''

        for (let i = 0; i < questions.length; i++) {
            let question = questions[i]

            // console.log(question)

            if (question.correctAnswer === studentAnswer[i]) {
                // console.log(question.isCorrect = true)
                question.isCorrect = true,
                    rightAnswer++
                score++
            } else {
                WrongeAnswer++
            }
        }

        if (studentAnswer.length !== questions.length) {
            throw new Error('please answer all question')
        }

        totalQuestions = questions.length
        grade = (rightAnswer / totalQuestions) * 100

        answeredQuestions = questions.map((question) => {
            return {
                question: question.question,
                isCorrect: question.isCorrect,
                correctAnswer: question.correctAnswer
            }
        })

        if (grade >= 50) {
            status = "pass"
        } else {
            status = "fail"
        }

        if (grade >= 80) {
            remarks = "Excellent"
        } else if (grade >= 70) {
            remarks = "Very Good"
        } else if (remarks >= 60) {
            remarks = 'Good'
        } else if (grade >= 50) {
            remarks = "Fair"
        } else {
            remarks = 'Poor'
        }


        const examResults = new ExamResult({
            studentID: studentFound?.studentId,
            exam: examFound?.id,
            grade,
            score,
            status,
            remarks,
            subject: examFound?.subject,
            classLevel: examFound?.classLevel,
            academicTerm: examFound.academicTerm,
            academicYear: examFound.academicYear,
            answeredQuestions: answeredQuestions
        })

        await examResults.save()

        studentFound.examResults.push(examResults._id)
        await studentFound.save()

        // console.log(examFound.academicTerm)
        // console.log(studentFound.currentClassLevel)

        //pramoted to next class
        if (examFound.academicTerm.name === "2nd term" && status === 'pass') {
            if (studentFound.currentClassLevel === "1st sem") {
                studentFound.classLevels.push("2nd sem")
                studentFound.currentClassLevel = "2nd sem"
            }else if(studentFound.currentClassLevel === "2nd sem"){
                studentFound.classLevels.push("3rd sem")
                studentFound.currentClassLevel = "3rd sem"
            }else if(studentFound.currentClassLevel === "3rd sem"){
                studentFound.classLevels.push("4th sem")
                studentFound.currentClassLevel = "4th sem"
            }
        }
        await studentFound.save()
        // if (examFound.academicTerm.name === "2nd term" && status === "pass" && studentFound.currentClassLevel === "1st sem") {
        //     studentFound.classLevels.push("2nd sem")
        //     studentFound.currentClassLevel = "2nd sem"

        //     await studentFound.save()
        // }

        // if (examFound.academicTerm.name === "2nd term" && status === "pass" && studentFound.currentClassLevel === "2nd sem") {
        //     studentFound.classLevels.push("3rd sem")
        //     studentFound.currentClassLevel = "3rd sem"

        //     await studentFound.save()
        // }

        // if (examFound.academicTerm.name === "2nd term" && status === "pass" && studentFound.currentClassLevel === "3rd sem") {
        //     studentFound.classLevels.push("4th sem")
        //     studentFound.currentClassLevel = "4th sem"

        //     await studentFound.save()
        // }

        // code for check student is in final year or not

        if (studentFound.currentClassLevel === '4th sem') {
            studentFound.isGraduated = true
            studentFound.yearGraduated = new Date()
            await studentFound.save()
        }

        // console.log(studentFound)

        res.status(200).json({
            status: "success",
            message: "you have submitted your exam. check letter for results",
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}