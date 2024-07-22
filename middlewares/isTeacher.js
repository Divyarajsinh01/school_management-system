const Teacher = require('../model/Staff/Teacher')

const isTeacher = async (req, res, next) => {
    try {
        const user = await Teacher.findById(req.user._id)

        if(user.role === 'teacher'){
            next()
        }else{
            throw new Error ('You are not teacher!')
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}


module.exports = isTeacher