const Admin = require("../../model/Staff/Admin");
const { ganerateAuth } = require("../../utils/ganerateAuth");

//@desc Register admin
//@route POST /api/admins/register
//@acess  Private
exports.registerAdmCtrl = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const adminFound = await Admin.findOne({ email })
    if (adminFound) {
      return res.status(400).json("Admin Exists");
    }
    //register
    const user = new Admin({
      name,
      email,
      password,
    })

    await user.save()
    const authToken = await ganerateAuth(user._id)
    res.status(201).json({
      status: "success",
      data: user,
      token: authToken,
      message: 'Admin register successfully!'
    })
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminCtrl = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Admin.findByCredentials(email, password)
    const authToken = await ganerateAuth(user._id)
    res.status(200).json({
      status: "success",
      data: user,
      token: authToken,
      message: 'Admin loggin successfully!'
    })
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc     Get all admins
//@route    GET /api/v1/admins
//@access   Private

exports.getAdminsCtrl = async (req, res) => {
  try {
    const admin = await Admin.find().select('-password -updatedAt -createdAt')
    res.status(201).json({
      status: "success",
      data: admin,
      message: 'get all admin'
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
}
//@desc     Get single admin
//@route    GET /api/v1/admins/:id
//@access   Private

exports.getAdminCtrl = async (req, res) => {
  try {
    const user = await Admin.findById(req.user._id).select('-password -createdAt -updatedAt')
      .populate('academicYears')
      .populate('academicTerms')
      .populate('yearGrops')
      .populate('classLevels')
      .populate('teachers')
      .populate('students')
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
//@desc    update admin
//@route    UPDATE /api/v1/admins/:id
//@access   Private
exports.updateAdminCtrl = async (req, res) => {
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

//@desc     admin suspends a teacher
//@route    PUT /api/v1/admins/suspend/teacher/:id
//@access   Private

exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin suspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
//@desc     admin unsuspends a teacher
//@route    PUT /api/v1/admins/unsuspend/teacher/:id
//@access   Private
exports.adminUnSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin Unsuspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
//@desc     admin withdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
//@desc     admin Unwithdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminUnWithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin Unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
//@desc     admin publich exam result
//@route    PUT /api/v1/admins/publish/exam/:id
//@access   Private
exports.adminPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin publish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc     admin unpublish exam result
//@route    PUT /api/v1/admins/unpublish/exam/:id
//@access   Private
exports.adminUnPublishResultsCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin unpublish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
