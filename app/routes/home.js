const Router = require("koa-router");
const router = new Router();

router.get("/", ctx => {
  ctx.body = "<h1>主页</h1>";
});

module.exports = router;
