exports.roleRestriction = (...roles) => {
    return async (req, res, next) => {
        try {
            // const user = await Admin.findById(req.user._id)
    
            if(roles.includes(req.user.role)){
                next()
            }else{
                throw new Error ('You does not have permission to permorm this action!')
            }
        } catch (error) {
            res.status(500).json({
                status: 'fail',
                message: error.message
            })
        }
    }    
}