const User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    console.log(req.body)
    const {name , email, password } = req.body;
  var hash = bcrypt.hashSync(password, 8);
  try {
    await User.create({ name ,email, password: hash });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    console.log("log")
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password does not match" });
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;

    var token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    res.cookie("Authoriztion", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ user});
  } catch (error) {}
};

const logout = (req, res) => {

    res.clearCookie("Authoriztion")
    res.sendStatus(200);

};

const checkAuth  = (req , res)=>{

    console.log(req.user)
    res.sendStatus(200);
}

module.exports = { signup, login, logout , checkAuth};
