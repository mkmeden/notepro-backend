const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    //read token off cookies
    const token = req.cookies.Authorization;
    console.log(token)
//decode the token
    var decoded = jwt.verify(token, process.env.SECRET);
    //find user using decoded sub
    if(Date.now()/1000 > decoded.exp)
        return res.sendStatus(401);

    const user = await User.findById(decoded.sub);

    if (!user) return res.sendStatus(401);

    //attach user to req

    req.user = user;

    //continue on

    next();
  } catch (error) {
        
    res.status(400).json({error : "Unauthorized"})
  }
}

module.exports = requireAuth;
