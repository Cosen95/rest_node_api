const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const routing = require("./routes");

// 自定义简易版错误处理
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.status = err.status || err.statusCode || 500;
//     ctx.body = {
//       message: err.message
//     };
//   }
// });

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
  })
);
app.use(bodyParser());

routing(app);

app.listen(3000, () => console.log("程序启动在3000端口了"));
