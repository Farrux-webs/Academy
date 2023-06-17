const Joi = require("joi");
const { v4: uuid } = require("uuid");
const News = require("../models/news");
const { Post } = require("../models/news");
const { Filter } = require("../models/news");

const GetNews = async (req, res) => {
  const GetData = await News.Get();

  res.status(200).json({ GetData });
};

const GetOneNews = async (req, res) => {
  const { id } = req.params;

  GetOneData = await News.GetOne(id);

  return res.status(200).json({ GetOneData });
};

const GetbyFilter = async (req, res) => {
  try {
    const { Sdate, Edate } = req.query;

    const dates = [Sdate, Edate];


    const FilteredData = await News.Filter(Sdate, Edate);
                                    
    return res.status(200).json({ FilteredData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Internal Server Error" });
  }
};














const AddNews = async (req, res) => {
  try {
    const { desc, title, short_desc } = req.body;

    const { photo } = req.files;


    const format = photo.mimetype.split("/")[1];



    const imagelink = `${uuid()}.${format}`;
    const path = `${process.cwd()}/src/uploads/News/${imagelink}`;


    const scheme = Joi.object({
      desc: Joi.string().required(),
      title: Joi.string().required(),
      short_desc: Joi.string().required(),
      photo: Joi.string(),
    });

    const { error } = await scheme.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const PostNews = await News.Post(desc, title, imagelink, short_desc);
    photo.mv(path);
    return res.status(201).json({ message: "success", PostNews });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Internal Server Error" });
  }
};



















const PutNews = async (req, res) => {
  try {
    const { desc, title, short_desc } = req.body;
    const {id } = req.params
    const { photo } = req.files;

    const format = photo.mimetype.split("/")[1];

    const path = process.cwd() + "/src/uploads/News/" + uuid() + `.${format}`;
    const Imagelink = uuid() + `.${format}`;

    const scheme = Joi.object({
      desc: Joi.string(),
      title: Joi.string(),
      short_desc: Joi.string(),
      photo: Joi.string(),
    });
    const { error } = await scheme.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const PostNews = await News.Put(desc, title, Imagelink, short_desc, id);
    photo.mv(path);
    return res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Internal server error" });
  }
};

const DelNews = async (req, res) =>{
  const { id } = req.params

    const DelData = await News.Delete(id);

    res.status(200).json({message: "Successfully deleted" });
}



module.exports = {
  GetNews,
  GetbyFilter,
  GetOneNews,
  AddNews,
  PutNews,
  DelNews,
};
