const bcrypt = require('bcrypt')

const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    academicTerms: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicTerm'
    }],
    academicYears: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicYear'
      }
    ],
    yearGrops:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'YearGroup'
    }],
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassLevel'
      }
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      }
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  },
  {
    timestamps: true,
  }
);


adminSchema.statics.findByCredentials = async (email, password) => {
  const user = await Admin.findOne({email})
  if(!user){
    throw new Error('unable to login')
  }
  const ispasswordvalid = await bcrypt.compare(password, user.password)
  if (!ispasswordvalid){
    throw new Error ('Invalid Password')
  }
  return user
}

//Hash password

adminSchema.pre('save', async function(next){
  const user = this

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
