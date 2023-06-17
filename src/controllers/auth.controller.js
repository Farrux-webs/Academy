const Joi = require("joi");
const Users = require("../models/users");

const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt");

const LoginU = async (req, res) => {
try {
  const { username, password } = req.body;

  // console.log(req.body);
  const scheme = Joi.object({
    username: Joi.string().min(6).max(32).required(),
    password: Joi.string().min(2).max(32).required(),
  });
  const { error } = scheme.validate({ username, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const user = await Users.foundUser(username);
  if (!user) {
    return res.status(404).json({ message: "Incorrect username or password" });
  }
  const verify = await bcrypt.compare(password, user.user_password);
  if (!verify) {
    return res.status(403).json({ message: "Incorrect username or password" });
  }
  const token = sign({ id: user.user_id, role: user.user_role });
  res.status(200).json({ message: "Success", token });
} catch (error) {
  // return res.status(401).json({ message: "Permission denied" });
  console.log(error.message);
}
};

const RegisterUser = async (req, res) => {
  try {
    const {name, lastname, username, password, age} = req.body;
    const scheme = Joi.object({
      name: Joi.string().required(),
      lastname: Joi.string().required(),
      username: Joi.string().min(6).max(32).alphanum().required(),
      password: Joi.string().min(6).max(32).required(),
      age:Joi.number().required()
    });

    console.log(req.body);
    const { error } = scheme.validate({ name, username, password,lastname, age });
    if (error) return res.status(403).json({ message: error.message });
    const user = await Users.foundUser(username);
     if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedpass = await bcrypt.hash(password, 12);
    const newUser = await Users.register(name, lastname, username, hashedpass,age);
    const token = sign({ id: newUser.user_id, role: newUser.user_role});
    console.log(token);
    return res
      .status(201)
      .json({ message: "Successfull registration", token, newUser });
  } catch (error) {
    return res.status(401).json({ message: "Permission denied" });
  }
};



module.exports = { LoginU, RegisterUser };




// Faqatgina Admin User qosha oladi. User ozi registratsiyadan ota olmaydi. 
// Admin databasega qoshb userga login va passwordlarini beradi.