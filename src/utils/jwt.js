const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/config")


const sign = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: "7h" });
const verify = (payload) => jwt.verify(payload, SECRET_KEY);

module.exports = {
  sign,
  verify,
};
