const Admin = require("../../model/Staff/Admin");
const Teacher = require("../../model/Staff/Teacher");
const { ganerateAuth } = require("../../utils/ganerateAuth");

//@desc admin register teacher
//@route POST /api/teachers/admin/register
//@acess  Private
exports.registerTeacherCtrl = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        const admin = await Admin.findById(req.user._id)
        if(!admin) {
            throw new Error('admin not found')
        }

        const teacherFound = await Teacher.findOne({ email })
        if (teacherFound) {
            return res.status(400).json("teacher Exists");
        }
        //register
        const user = new Teacher({
            name,
            email,
            password,
        })

        await user.save()

        admin.teachers.push(user._id)
        await admin.save()

        res.status(201).json({
            status: "success",
            data: user,
            message: 'Admin register successfully!'
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc     login teachers
//@route    POST /api/v1/teacers/login
//@access   Private
exports.loginTeacherCtrl = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Teacher.findByCredentials(email, password)
        const authToken = await ganerateAuth(user._id)
        res.status(200).json({
            status: "success",
            data: user,
            token: authToken,
            message: 'Teacher loggin successfully!'
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc     Get all teachers by admin
//@route    GET /api/v1/teachers/admin
//@access   Private

exports.getTeachersbyAdminCtrl = async (req, res) => {
    try {
        // const admin = await Teacher.find().select('-password -updatedAt -createdAt')
        // res.status(201).json({
        //     status: "success",
        //     data: admin,
        //     message: 'get all Teacher'
        // });
        res.status(200).json(res.results)
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}
//@desc     Get single teacher by admin
//@route    GET /api/v1/teachers/:id/admin
//@access   Private

exports.getTeacherbyAdminCtrl = async (req, res) => {
    try {
        const teacherID = req.params.teacherID;
        const user = await Teacher.findById(teacherID).select('-password -createdAt -updatedAt')
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "no user found"
            })
        }
        res.status(200).json({
            status: "success",
            data: user,
            message: 'admin get successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//@desc     Get single teacher
//@route    GET /api/v1/teachers/profile
//@access   Private


exports.getTeacherCtrl = async (req, res) => {
    try {
        const user = await Teacher.findById(req.user._id).select('-password -createdAt -updatedAt')
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "no user found"
            })
        }
        res.status(200).json({
            status: "success",
            data: user,
            message: 'admin get successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//@desc    update teacher
//@route    UPDATE /api/v1/teachers/profile
//@access   Private
exports.updateTeacherCtrl = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'password', 'email']
    const isValidation = updates.every((update) => {
        return allowUpdates.includes(update)
    })

    if (!isValidation) {
        return res.status(400).json({
            status: "fail",
            message: 'invalid updates'
        })
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.status(200).json({
            status: "success",
            data: req.user,
            message: 'update success'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to update',
        });
    }
}


//@desc     Delete admin
//@route    DELETE /api/v1/admins/:id
//@access   Private
exports.deleteAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "delete admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//admin assign role to teacher

exports.adminUpdateTeacher = async (req, res) => {
    try {

        const { program, classLevel, academicYear, academicTerm, subject } = req.body
        const teacher = await Teacher.findById(req.params.teacherID)

        if (!teacher) {
            return res.status(404).json({
                status: 'fail',
                message: "teacher not found"
            })
        }

        if (teacher.isWitdrawn) {
            throw new Error('action denied, teacher is withdrawn')
        }


        if(subject || program || classLevel || academicTerm || academicYear){
            teacher.program = program 
            teacher.classLevel = classLevel
            teacher.academicTerm = academicTerm
            teacher.academicYear = academicYear
            teacher.subject = subject

            await teacher.save()

            return res.status(200).json({
                status: "success",
                data: teacher,
                message: "admin update teacher successfully"
            })
        }

        // if (program) {
        //     teacher.program = program

        //     await teacher.save()

        //     res.status(200).json({
        //         status: "success",
        //         data: teacher,
        //         message: "admin updated teacher successfully!"
        //     })
        // }

        // if (classLevel) {
        //     teacher.classLevel = classLevel

        //     await teacher.save()
        //     res.status(200).json({
        //         status: "success",
        //         data: teacher,
        //         message: "admin updated teacher successfully!"
        //     })
        // }

        // if (academicYear) {
        //     teacher.academicYear = academicYear

        //     await teacher.save()

        //     res.status(200).json({
        //         status: "success",
        //         data: teacher,
        //         message: "admin updated teacher successfully!"
        //     })
        // }


        // if (academicTerm) {
        //     teacher.academicTerm = academicTerm

        //     await teacher.save()

        //     res.status(200).json({
        //         status: "success",
        //         data: teacher,
        //         message: "admin updated teacher successfully!"
        //     })
        // }

        // if(teacher.subject){
        //     teacher.subject = subject

        //     await teacher.save()

        //     res.status(200).json({
        //         status: "success",
        //         data: teacher,
        //         message: "admin updatedd teacher"
        //     })
        // }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
} 