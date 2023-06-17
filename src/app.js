const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const { routes } = require("./routes/routes.js");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(fileUpload());
app.use( "/players",  express.static("src/uploads/Players"));
app.use( "/aboutus",  express.static("src/uploads/AboutUs"));
app.use( "/news",  express.static("src/uploads/News"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(config.PORT, () => {
  console.log("Server is running on port: " + config.PORT);
});
