const { verify } = require("../utils/jwt");

const CheckRole = (role) => {
  return (req, res, next) => {
    const { user } = req;
   

    if (role === "admin") {
      if (user.role === "admin" || user.role === "admin") return next();
      else return res.status(403).json({ message: "role is inconvenient" });
    } else if (role === "user") {
      if (user.role === "user" || user.role === role) return next();
      else return res.status(403).json({ message: "role is inconvenient" });
    }else if (role === "player") {
      if (user.role === "player" || user.role === role) return next();
      else return res.status(403).json({ message: "role is inconvenient" });
    }
  };
};
module.exports = { CheckRole };
