"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
function setupSubscribe(bot) {
    bot.command('subscribe', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        // Check format
        const subscribeStringTemp = (ctx.message || ctx.channelPost).text
            .substr(11)
            .trim()
            .replace(/@/g, '');
        if (!subscribeStringTemp) {
            return ctx.reply(locale_1.loc('subscribe_format', chat.language), {
                disable_notification: true,
                parse_mode: 'Markdown',
            });
        }
        // Check if bot is admin in this chat
        try {
            let isBotAdmin = ctx.chat.type === 'private';
            if (!isBotAdmin) {
                const chatAdmins = await ctx.getChatAdministrators();
                isBotAdmin = chatAdmins
                    .map((m) => m.user.username)
                    .includes(bot.options.username);
            }
            if (!isBotAdmin) {
                throw new Error();
            }
        }
        catch (err) {
            return ctx.reply(locale_1.loc('bot_not_admin', chat.language), {
                disable_notification: true,
            });
        }
        const subscribeStrings = subscribeStringTemp.split(',').map((s) => s.trim());
        for (const subscribeString of subscribeStrings) {
            // Check if bot is admin in subscribe chat
            try {
                const subscribeChatAdmins = await ctx.telegram.getChatAdministrators(`${!isNaN(+subscribeString) ? '' : '@'}${subscribeString}`);
                const isBotAdmin = subscribeChatAdmins
                    .map((m) => m.user.username)
                    .includes(bot.options.username);
                if (!isBotAdmin) {
                    throw new Error();
                }
            }
            catch (err) {
                return ctx.reply(`${locale_1.loc('bot_not_admin_chat', chat.language)}${subscribeStrings
                    .map((s) => `${!isNaN(+s) ? '' : '@'}${s}`)
                    .join(', ')}`, {
                    disable_notification: true,
                });
            }
        }
        // Add subscibe string
        chat.subscribe = subscribeStrings.join(',');
        await chat.save();
        // Report success
        return ctx.reply(`${locale_1.loc('subscribe_success', chat.language)}${subscribeStrings
            .map((s) => `${!isNaN(+s) ? '' : '@'}${s}`)
            .join(', ')}`, {
            disable_notification: true,
        });
    });
}
exports.setupSubscribe = setupSubscribe;
//# sourceMappingURL=subscribe.js.map