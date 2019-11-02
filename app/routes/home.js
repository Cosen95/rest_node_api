const Router = require("koa-router");
const router = new Router();
const { upload } = require("../controllers/home");

router.get("/", ctx => {
  ctx.body = "<h1>主页</h1>";
});

router.post("/upload", upload);

module.exports = router;
