const mongoose = require ("mongoose");
const jwt =  require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
});
userSchema.methods.generateAuthToken = async (id) =>{
    const token = jwt.sign({id: id}, process.env.SECRET)
    return token;
}
const User = mongoose.model('User', userSchema);
module.exports= User;