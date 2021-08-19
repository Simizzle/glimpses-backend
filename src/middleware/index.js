const jwt = require('jsonwebtoken')
const User = require('../users/users.model')
exports.auth = async (req, res, next) =>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: decoded.id})
        if(!user) {
            throw new Error()
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({message: "Please log in"})
    }
}