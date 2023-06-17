const Joi = require("joi");
const AboutUS = require("../models/AboutUs");
const { v4: uuid } = require("uuid");

const GetAboutUS = async (req, res) => {
  const GetData = await AboutUS.Get();

  res.status(200).json({ GetData });
};

const PostAboutUs = async (req, res) => {
  try {
    const { desc, title } = req.body;

    const { photo } = req.files;

    const format = photo.mimetype.split("/")[1];

    const imagelink = `${uuid()}.${format}`;
    const path = `${process.cwd()}/src/uploads/AboutUs/${imagelink}`;

    const scheme = Joi.object({
      desc: Joi.string().min(8).required(),
      title: Joi.string().required(),
      photo: Joi.string(),
    });

    const { error } = await scheme.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const Postaboutus = await AboutUS.Post(imagelink, desc, title);
    photo.mv(path);
    return res.status(201).json({ message: "success"});
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Internal Server Error" });
  }
};

const PutAboutus = async (req, res) => {
  try {
    const { desc, title } = req.body;
    const { id } = req.params;
    const { photo } = req.files;


    const format = photo.mimetype.split("/")[1];

  const imagelink = `${uuid()}.${format}`;
  const path = `${process.cwd()}/src/uploads/AboutUs/${imagelink}`;

    const scheme = Joi.object({
      desc: Joi.string().min(6).required(),
      title: Joi.string().required(),
      photo: Joi.string(),
    });
    const { error } = await scheme.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const Putabout = await AboutUS.Put(imagelink, desc, title, id);
    photo.mv(path);
    return res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Internal server error" });
  }
};

const DelAboutUs = async (req, res) => {
  const { id } = req.params;

  const DelData = await AboutUS.Delete(id);

  res.status(200).json({ message: "Successfully deleted" });
};


module.exports = { GetAboutUS, PostAboutUs, PutAboutus, DelAboutUs };
