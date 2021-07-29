"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
function setupNosubscribe(bot) {
    bot.command('nosubscribe', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        chat.subscribe = undefined;
        await chat.save();
        // Reply
        return ctx.reply(locale_1.loc('nosubscribe_success', chat.language), {
            disable_notification: true,
        });
    });
}
exports.setupNosubscribe = setupNosubscribe;
//# sourceMappingURL=nosubscribe.js.map