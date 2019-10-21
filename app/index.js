const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const routing = require("./routes");
app.use(bodyParser());

routing(app);

app.listen(3000, () => console.log("程序启动在3000端口了"));
