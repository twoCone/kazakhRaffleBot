"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
function setupWinnerMessage(bot) {
    bot.hears('Изменить текст при окончании розыгрыша', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(chatId);
        // Send instructions
        await ctx.reply(locale_1.loc('winner_message', chat.language), {
            disable_notification: true,
        });
        // Send current message if there is one
        if (chat.winnerMessage) {
            return ctx.telegram.sendCopy(ctx.chat.id, chat.winnerMessage);
        }
    });
    bot.command('noWinnerMessage', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(chatId);
        // Turn off raffle message
        chat.winnerMessage = undefined;
        await chat.save();
        // Send instructions
        return ctx.reply(locale_1.loc('winner_message_off', chat.language), {
            disable_notification: true,
        });
    });
    bot.use(async (ctx, next) => {
        try {
            // Check if reply
            const message = ctx.message || ctx.channelPost;
            if (!message ||
                !message.reply_to_message ||
                !message.reply_to_message.text ||
                !message.text ||
                !message.text.includes('$numberOfParticipants') ||
                !message.text.includes('$winner') ||
                !((message.reply_to_message.from &&
                    message.reply_to_message.from.username === bot.options.username) ||
                    ctx.chat.type === 'channel') ||
                !message.reply_to_message.text ||
                !message.reply_to_message.text.includes('🎉')) {
                return;
            }
            // Get chat id
            const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
            if (!chatId) {
                return;
            }
            // Get chat
            const chat = await chat_1.findChat(chatId);
            // Send mesage
            await ctx.telegram.sendCopy(ctx.chat.id, message, {
                disable_notification: true,
                parse_mode: 'HTML',
            });
            // Setuo message
            chat.winnerMessage = message;
            await chat.save();
            // Reply success
            ctx.reply(locale_1.loc('success', chat.language), {
                disable_notification: true,
            });
        }
        finally {
            next();
        }
    });
}
exports.setupWinnerMessage = setupWinnerMessage;
//# sourceMappingURL=winnerMessage.js.map