const { fetchOne, fetch } = require("../utils/pg");

const cregister =
  "Insert into users ( user_name,user_lastname, user_username, user_password, user_age)values($1, $2, $3, $4, $5) returning *";

// const login =  "select * from users where  user_username = $1, user_password = $2";

const findByUsername = "select * from users where user_username = $1";

const findAll = "select * from users";

const register = (name, lastname, username, password, age) => fetchOne(cregister, name, lastname, username, password,age);
const LoginUser = (username, password) => fetchOne(login, username, password);
const foundUser = (username) => fetchOne(findByUsername, username);
const Getuser = () => fetch(findAll);

module.exports = {
  register,
  LoginUser,
  foundUser,
  Getuser,
};
