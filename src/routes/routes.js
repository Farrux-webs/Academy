const { Router } = require("express");
const routes = Router();
const { LoginU, RegisterUser } = require("../controllers/auth.controller");
const {
  GetPlayer,
  GetOnePlayer,
  AddPlayer,
  PutPlayer,
  DeletePlayer,
} = require("../controllers/Player.controller");

const {
  GetNews,
  GetbyFilter,
  GetOneNews,
  AddNews,
  PutNews,
  DelNews,
  getView,
} = require("../controllers/news.controller");

const { isAuth } = require("../middlewares/is-Auth.middleware");
const { CheckRole } = require("../middlewares/check-role.middleware");

routes.post("/auth/login", LoginU);
routes.post("/auth/register", RegisterUser);
routes.get("/players", GetPlayer);
routes.get("/players/:id", GetOnePlayer);
routes.post("/players/add", isAuth, CheckRole("admin"), AddPlayer);
routes.put("/players/put/:id", isAuth, CheckRole("admin"), PutPlayer);
routes.delete("/players/del/:id", isAuth, CheckRole("admin"), DeletePlayer);
routes.get("/news", GetNews);
routes.get("/news/:id", GetOneNews);
routes.get("/filter/date", GetbyFilter);
routes.post("/news/add", isAuth, CheckRole("admin"), AddNews);
routes.put("/news/put/:id", isAuth, CheckRole("admin"), PutNews);
routes.delete("/news/del/:id", isAuth, CheckRole("admin"), DelNews);

module.exports = { routes };