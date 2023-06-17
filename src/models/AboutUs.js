const { fetchOne, fetch } = require("../utils/pg");

// psql commands

const GetLatest =
  "SELECT * FROM aboutus ORDER BY about_created_at DESC LIMIT 1;";

const Addaboutus =
  "Insert Into aboutus(about_img, about_desc, about_title)Values($1, $2, $3)";


const UpdateAboutUS =
  "Update aboutus set about_img = $1, about_desc = $2, about_title = $3 where about_id = $4";

const DeleteAboutUs = "Delete from aboutus where about_id = $1";

const Get = () => fetch(GetLatest);

const Post = (photo, desc, title) => fetch(Addaboutus, photo, desc, title);

const Put = (photo, desc, title, id) =>
  fetchOne(UpdateAboutUS, photo, desc, title, id);

const Delete = (id) => fetchOne(DeleteAboutUs, id);

module.exports = { Get,  Post, Put, Delete };

// Insert Into news(news_desc, news_title, news_photo, news_short_desc)Values('bu yerda description bolishi mumkin edi...', 'Tez Kunda Katta Yangilik', 'sxwwcwecwecwc', 'short description');
