const { fetchOne, fetch } = require("../utils/pg");

//  psql commands

const GetAllusers = "select * from users";

const GetOneuser = "select * from users where user_id = $1";

const getByNumber = "select * from users where user_gamenum = $1"

const AddPlayer =
  "Insert Into users( user_gamenum, user_name, user_lastname, user_username, user_password, user_age, user_position, user_photo)Values($1, $2, $3, $4, $5, $6, $7, $8)";

const Updateuser =
  "Update  users set user_gamenum = $1, user_name = $2, user_lastname = $3, user_username = $4, user_password = $5, user_age = $6, user_position = $7, user_photo = $8, user_updated = current_timestamp where user_id = $9";

const Deleteuser = "Delete from users where user_id = $1";

// models

const Get = () => fetch(GetAllusers);

const GetOne = (id) => fetchOne(GetOneuser, id);

const GetNumber = (number) => fetchOne(getByNumber, number);

const Post = (number, name, lastname,username,password, age, position, photo) =>
  fetchOne(AddPlayer, number, name, lastname,username,password ,age, position, photo);

const Put = (number, name, lastname, username, password, age, position, photo, id) =>
  fetchOne(Updateuser, number, name, lastname, username, password, age, position, photo, id);

const Delete = (id) => fetchOne(Deleteuser, id);

module.exports = { Get, GetOne, Post, Put, Delete, GetNumber };
