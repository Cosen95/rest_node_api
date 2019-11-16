const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const {
  find,
  findById,
  create,
  checkOwner,
  update,
  delete: del,
  login,
  listFollowing,
  listFollowers,
  checkUserExist,
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  listFollowingTopic,
  listQuestions,
  likingAnswer,
  unlikingAnswer,
  listLikingAnswers,
  disLikingAnswer,
  unDisLikingAnswer,
  listDisLikingAnswers,
  listCollectingAnswer,
  collectingAnswer,
  unCollectingAnswers
} = require("../controllers/users");
const { checkTopicExist } = require("../controllers/topics");

const { checkAnswerExist } = require("../controllers/answers");

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

router.get("/:id", findById);

router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, del);

router.post("/login", login);

router.get("/:id/following", listFollowing);

router.get("/:id/followers", listFollowers);

router.put("/following/:id", auth, checkUserExist, follow);

router.delete("/following/:id", auth, checkUserExist, unfollow);

router.put("/followingTopic/:id", auth, checkTopicExist, followTopic);

router.delete("/followingTopic/:id", auth, checkTopicExist, unfollowTopic);

router.get("/:id/followingTopic", listFollowingTopic);

router.get("/:id/questions", listQuestions);

router.get("/:id/likingAnswers", listLikingAnswers);

router.put(
  "/likingAnswers/:id",
  auth,
  checkAnswerExist,
  likingAnswer,
  unDisLikingAnswer
);

router.delete("/likingAnswers/:id", auth, checkAnswerExist, unlikingAnswer);

router.get("/:id/dislikingAnswers", listDisLikingAnswers);

router.put(
  "/dislikingAnswers/:id",
  auth,
  checkAnswerExist,
  disLikingAnswer,
  unlikingAnswer
);

router.delete(
  "/dislikingAnswers/:id",
  auth,
  checkAnswerExist,
  unDisLikingAnswer
);

router.get("/:id/collectingAnswers", listCollectingAnswer);

router.put("/collectingAnswers/:id", auth, checkAnswerExist, collectingAnswer);

router.delete(
  "/collectingAnswers/:id",
  auth,
  checkAnswerExist,
  unCollectingAnswers
);

module.exports = router;
