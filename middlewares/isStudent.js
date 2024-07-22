const Student = require('../model/Academic/Student')


const isStudent = async (req, res, next) => {
    try {
        const user = await Student.findById(req.user._id)

        if(user.role === 'student'){
            next()
        }else{
            throw new Error ('You are not student!')
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}


module.exports = isStudent