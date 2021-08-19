const User = require("./users.model");
exports.createUser = async (req, res) => {
try {
    const user= new User(req.body);
    console.log(user)
    const savedUser = await user.save();
    const token =  await user.generateAuthToken(user._id)
    console.log(savedUser)
    res.status(200).send ({user:savedUser, token: token, message: "User created in database" });
} catch (error) {
    res.status(500).send (error)
}
};
exports.findUser =async (req, res) => {
    try {
        const user = req.params.username;
        const targetUser = await User.findOne ({ username: user, password: req.body.password});
        const token = await targetUser.generateAuthToken(targetUser._id)
       res.status(200).send({ user: targetUser, token: token})
    } catch (error) {
        res.status(500).send (error);
    }
};
exports.deleteUser = async (req, res) => {
  try {
      const userInput = {
          user: req.body.user,
          pass: req.body.pass,
          confirmation: req.body.confirmation
      }
      if (userInput.confirmation == 'I am sure') {
          await User.findOneAndRemove({
              username: userInput.user,
              password: userInput.pass
          }, (err, user) => {
              if (err) res.status(500).send(err);
              res.status(200).send({
                  user,
                  message: 'user has been deleted'
              })
          })
      }
  } catch (error) {
      res.status(500).send(error)
  }
};
exports.authUser = async (req, res) => {
  res.status(200).send(req.user)
} 
exports.updateUser = async (req, res) => {
  try {
    console.log(req.body.oldPassword);
    let updateUser;
    const filter = req.body.oldUsername;
    const oldPass = req.body.oldPassword;
    const user = req.body.newUsername;
    const newPass = req.body.newPassword;
    const email = req.body.email;
    console.log(req.body.newPassword);
    if (user) {
      updateUser = await User.updateOne(
        { username: filter },
        { username: user }
      );
    } else if (newPass) {
      console.log({ username: filter, password: oldPass });
      updateUser = await User.updateOne(
        { username: filter, password: oldPass },
        { password: newPass }
      );
    } else if (email) {
      updateUser = await User.updateOne(
        { username: filter, password: oldPass },
        { email: email }
      );
}
    res.status(200).send({ user: updateUser, message: "User modified" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateUserEmail = async (req, res) => {
    try {
        const userInput = {
            user: req.body.user,
            pass: req.body.pass,
            new: req.body.new
        }
        await User.findOneAndUpdate({
            username: userInput.user,
            password: userInput.pass
        }, {
            email: userInput.new
        }, (err, user) => {
            if (err) res.status(500).send(err);
            res.status(200).send({
                user
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
}