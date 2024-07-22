const jwt = require('jsonwebtoken')


const ganerateAuth = async (id) => {
    const token = jwt.sign({id}, "hellomyname")
    // console.log('Generated Token:', token)
    return token
}

module.exports = { ganerateAuth }