const jwt = require('jsonwebtoken')
const Admin = require('../model/Staff/Admin')
const isloggin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)

        const decode = jwt.verify(token, "hellomyname")
        // console.log(decode)

        const user = await Admin.findOne({_id : decode.id})
        // console.log(user)

        if (!user) {
            return res.status(401).json({
                err: 'user is not aurhorized!'
            })
        }

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            error: "unauthorized!"
        });
    }
}


module.exports = isloggin