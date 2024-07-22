const Exam = require('../../model/Academic/Exam')
const Question = require('../../model/Academic/Questions')


exports.createQuestions = async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body

        const examFound = await Exam.findById(req.params.examID)

        if(!examFound){
            return res.status(401).json({
                status: "fail",
                message: "exam not found"
            })
        }

        const questionFound = await Question.findOne({question})
        
        if(questionFound){
            throw new Error('question alredy exists!')
        }

        const questions = new Question({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            createdBy: req.user._id
        })

        await questions.save()

        examFound.questions.push(questions._id)
        await examFound.save()

        res.status(201).json({
            status: "success",
            data: questions,
            message: "question created successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.getAllQuestions = async(req, res) => {
    try {
        const question = await Question.find()

        res.status(200).json({
            status:"success",
            data: question,
            message: "question created successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getSigleQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionID)

        res.status(200).json({
            status: "success",
            data: question,
            message: "question fetched successfully"
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message: error.message
        })
    }
}


exports.updateQuestion = async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body

        const questionFound = await Question.findOne({question})
        
        if(questionFound){
            throw new Error('question alredy exists!')
        }

        const questions = await Question.findByIdAndUpdate(
            req.params.questionID,
            {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
                createdBy: req.user._id
            }
        )

        res.status(200).json({
            status: "success",
            data: questions,
            "message": 'question update successfully'
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}