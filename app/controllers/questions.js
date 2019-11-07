const Question = require("../models/questions");

class QuestionController {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Question.find({ $or: [{ title: q }, { description: q }] })
      .limit(perPage)
      .skip(page * perPage);
  }
  async findById(ctx) {
    const { fields } = ctx.query;
    const selectFields =
      fields &&
      fields
        .split(";")
        .filter(f => f)
        .map(f => " +" + f)
        .join("");
    const question = await Question.findById(ctx.params.id)
      .select(selectFields)
      .populate("questioner");
    ctx.body = question;
  }
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: { type: "string", required: false }
    });
    const question = await new Question({
      ...ctx.request.body,
      questioner: ctx.state.user._id
    }).save();
    ctx.body = question;
  }
  async checkQuestioner(ctx, next) {
    const { question } = ctx.state;
    if (question.questioner.toString() !== ctx.state.user._id) {
      ctx.throw(403, "无权限");
    }
    await next();
  }
  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: { type: "string", required: false }
    });
    await ctx.state.question.update(ctx.request.body);
    ctx.body = ctx.state.question;
  }
  async delete(ctx) {
    const question = await Question.findByIdAndRemove(ctx.params.id);
    if (!question) {
      ctx.throw(404, "问题不存在");
    }
    ctx.status = 204;
  }
  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select(
      "+questioner"
    );
    if (!question) {
      ctx.throw(404, "问题不存在");
    }
    ctx.state.question = question;
    await next();
  }
}

module.exports = new QuestionController();
