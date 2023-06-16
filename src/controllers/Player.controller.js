const Joi = require("joi");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const Players = require("../models/players");

const GetPlayer = async (req, res) => {
  const GetData = await Players.Get();

  res.status(200).json({players:GetData });
};

const GetOnePlayer = async (req, res) => {
  const { id } = req.params;

  GetOneData = await Players.GetOne(id);

  res.status(200).json({player:GetOneData });
};

const AddPlayer = async (req, res) => {
  try {
    const { number, name, lastname,username,password, age, position } = req.body;
    // console.log(req.body);

    // console.log(req.body);

    const { photo } = req.files;
    // console.log(req.files);

    const format = photo.mimetype.split("/")[1];
      const path = `${process.cwd()}/src/uploads/${uuid()}.${format}`;
    // const ImageLink = `${process.cwd()}"upload"${photo.name}.${format}`;

    const scheme = Joi.object({
      number: Joi.number().required(),
      name: Joi.string().min(4).alphanum().required(),
      lastname: Joi.string().min(4).alphanum().required(),
      username:Joi.string().min(4).alphanum().required(),
      password:Joi.string().min(4).alphanum().required(),
      age:Joi.number().required(),
      position:Joi.string().required(),
      age: Joi.number().required(),
      position: Joi.string()
        .valid("Hujumchi", "Himoyachi", "Yarim Himoyachi", "Darvozabon")
        .required(),
    });

    const { error } = await scheme.validate({number,name,lastname,username,password,age,position});

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const takenNumber = await Players.GetNumber(number);

    if (takenNumber) {
      return res.status(400).send({ message: "Number is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const PostPlayer = await Players.Post(
      number,
      name,
      lastname,
      username,
      hashedPassword,
      age,
      position,
      path
    );
    // console.log(PostPlayer);

    // console.log(photo.name);

    // photo.mv(path);

    return res.status(201).json({ message: "Successfully posted", newplayer:PostPlayer });
  } catch (error) {
    console.log(error.message);
    // return res.status(401).json({ message: "Permission denied" });
    
  }
};

const PutPlayer = async (req, res) => {
  try {
    const { number, name, lastname,username,password, age, position } = req.body;
    const { id } = req.params;
    const { photo } = req.files;

    const format = photo.mimetype.split("/")[1];

    const path = process.cwd() + "/src/uploads/" + uuid() + `.${format}`;
    const Imagelink = uuid() + `.${format}`;

    const UpdatedPlayer = await Players.Put(
      number,
      name,
      lastname,
      username,
      password,
      age,
      position,
      Imagelink,
      id
    );

    photo.mv(path);

    return res.status(201).json({ message: "Successfully Updated", UpdatedPlayer });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Permission denied" });
  }
};

const DeletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const delU = await Players.Delete(id);

    return res.status(204).json({message: "Sucessfully deleted"})
  } catch (error) {
    return res.status(404).json({ message: "Permission Denied" });
  }
};

module.exports = {
  GetPlayer,
  GetOnePlayer,
  AddPlayer,
  PutPlayer,
  DeletePlayer,
};
