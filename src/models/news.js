const { fetchOne, fetch } = require("../utils/pg");

// psql commands

const GetAllNews = "select * from news";

const GetOneNews = "select * from news where news_id = $1";

const GetByDate =
  "select * from news where news_created_at between $1 and $2";

const AddNews =
  "Insert Into news(news_desc, news_title, news_photo, news_short_desc)Values($1, $2, $3, $4)";

const UpdateNews =
  "Update news set news_desc = $1, news_title = $2, news_photo = $3, news_short_desc = $4 where news_id = $5";

const DeleteNews = "Delete from news where news_id = $1";

const Get = () => fetch(GetAllNews);

const GetOne = (id) => fetchOne(GetOneNews, id);

const Filter = (Sdate, Edate) => fetch(GetByDate, Sdate, Edate);

const Post = (desc, title, photo, short_desc) =>
  fetch(AddNews, desc, title, photo, short_desc);

const Put = (desc, title, photo, short_desc, id) =>
  fetchOne(UpdateNews, desc, title, photo, short_desc, id);

const Delete = (id) => fetchOne(DeleteNews, id);

module.exports = { Get, GetOne, Post, Put, Delete, Filter };

// Insert Into news(news_desc, news_title, news_photo, news_short_desc)Values('bu yerda description bolishi mumkin edi...', 'Tez Kunda Katta Yangilik', 'sxwwcwecwecwc', 'short description');
