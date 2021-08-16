const User = require("./users.model");

exports.createUser = async (req, res) => {
try {
    const user= new User(req.body);
    const savedUser = await user.save();
    res.status(200).send ({user:savedUser, message: "User created in database" });
} catch (error) {
    res.status(500).send (error)
}
};

exports.findUser =async (req, res) => {
   
    try {
        const user = req.params.username;
        const targetUser = await User.findOne ({ username: user});
        res.status(200).send({ user: targetUser})
    } catch (error) {
        res.status(500).send (error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = req.params.username;
        const removeUser= await User.findOneAndRemove ({username: user});
        res.status(200).send ({user: removeUser, message: "User successfully deleted"});
        
    } catch (error) {
        res.status(500).send (error);
        }
};

exports.updateUser = async (req, res) => {
    try {
        const user = req.params.username;
        const updateUser= await User.findOneAndUpdate ({username: user});
        res.status(200).send ({user: updateUser, message: "User successfully updated"});
    } catch (error) {
        
    }
};