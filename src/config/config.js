require("dotenv").config();

module.exports = {
  POSTGRES_CONNECTION_STRING: process.env.CONNECTION_STRING,
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.JWT_KEY,
};
