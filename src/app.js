const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const { routes } = require("./routes/routes.js");
const app = express();
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use('/photos', express.static('photos'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(config.PORT, () => {
  console.log("Server is running on port: " + config.PORT);
});
