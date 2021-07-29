"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
function setupRaffleMessage(bot) {
    bot.hears('Изменить текст розыгрыша', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(chatId);
        // Send instructions
        await ctx.reply(locale_1.loc('raffle_message', chat.language), {
            disable_notification: true,
        });
        // Check if needs to send current message
        if (chat.raffleMessage) {
            return ctx.telegram.sendCopy(ctx.chat.id, chat.raffleMessage);
        }
    });
    bot.command('noRaffleMessage', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(chatId);
        // Turn off raffle message
        chat.raffleMessage = undefined;
        await chat.save();
        // Send instructions
        return ctx.reply(locale_1.loc('raffle_message_off', chat.language), {
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
                (!message.text && !message.caption) ||
                (message.text && !message.text.includes('$numberOfParticipants')) ||
                (message.caption &&
                    !message.caption.includes('$numberOfParticipants')) ||
                !((message.reply_to_message.from &&
                    message.reply_to_message.from.username === bot.options.username) ||
                    ctx.chat.type === 'channel') ||
                !message.reply_to_message.text ||
                !message.reply_to_message.text.includes('💪')) {
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
            });
            // Setup message
            chat.raffleMessage = message;
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
exports.setupRaffleMessage = setupRaffleMessage;
//# sourceMappingURL=raffleMessage.js.map