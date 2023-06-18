const { verify } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = await req.headers["authorization"].split(" ")[1];


    if (!token) return res.status(401).json({ message: "Permission denied" });
    const user = verify(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Permission denied" });
  }
};

module.exports = { isAuth };
