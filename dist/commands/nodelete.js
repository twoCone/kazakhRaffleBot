"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
function setupNodelete(bot) {
    bot.command('nodelete', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        chat.nodelete = !chat.nodelete;
        await chat.save();
        // Reply
        return ctx.reply(locale_1.loc(`nodelete_${chat.nodelete}`, chat.language), {
            disable_notification: true,
        });
    });
}
exports.setupNodelete = setupNodelete;
//# sourceMappingURL=nodelete.js.map