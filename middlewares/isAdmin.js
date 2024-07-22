const Admin = require('../model/Staff/Admin')

const isAdmin = async (req, res, next) => {
    try {
        const user = await Admin.findById(req.user._id)

        if(user.role === 'admin'){
            next()
        }else{
            throw new Error ('You are not admin!')
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}


module.exports = isAdmin