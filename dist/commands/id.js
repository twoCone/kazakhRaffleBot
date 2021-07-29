"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setupId(bot) {
    bot.command('id', async (ctx) => {
        return ctx.reply(`${ctx.chat.id}, ${ctx.from.id}`);
    });
}
exports.setupId = setupId;
//# sourceMappingURL=id.js.map