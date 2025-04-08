const jwt = require("jsonwebtoken");
const BlackList = require("../models/blackListedToken");
const adminUserAuth = {
  authT: async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(404).send({ msg: "Token not found" });
    }
    let findBlock = await BlackList.findOne({ token: token });
    if (findBlock) {
      return res.status(200).send({ msg: "You are already logout" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ msg: "You're not authenticated person", Error: err.message });
      }
      req.user = decoded;
      next();
    });
  },
  authR: (roles) => {
    return (req, res, next) => {
      console.log(req.user.role);
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(403).send({
          msg: "You're not authorized person to access this resource",
        });
      }
    };
  },
};
module.exports = adminUserAuth;
