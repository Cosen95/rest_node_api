class HomeController {
  upload(ctx) {
    const file = ctx.request.files.file;
    ctx.body = { path: file.path };
  }
}

module.exports = new HomeController();
