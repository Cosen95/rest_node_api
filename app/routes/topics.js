const jwt = require("koa-jwt");
const { secret } = require("../config");
const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
const {
  find,
  findById,
  create,
  update,
  listTopicFollowers,
  checkTopicExist
} = require("../controllers/topics");

// const auth = async (ctx, next) => {
//   const { authorization = "" } = ctx.request.header;
//   const token = authorization.replace("Bearer ", "");
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     ctx.state.user = user;
//   } catch (error) {
//     ctx.throw(401, error.message);
//   }
//   await next();
// };

const auth = jwt({ secret });

router.get("/", find);

router.post("/", auth, create);

router.get("/:id", checkTopicExist, findById);

router.patch("/:id", auth, checkTopicExist, update);

router.get("/:id/followers", listTopicFollowers);

module.exports = router;
