"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
/**
 * Setting up the language command
 * @param bot Bot to setup the command
 */
function setupLanguage(bot) {
    bot.command('language', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx, true);
        if (!chatId) {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(chatId);
        // Reply
        ctx.reply(locale_1.loc('select_language', chat.language), {
            reply_markup: getButtons(),
            disable_notification: true,
        });
    });
}
exports.setupLanguage = setupLanguage;
/**
 * Setting up callback for the language keyboard
 * @param bot Bot to setup the callback
 */
function setupLanguageCallback(bot) {
    ;
    bot.action(async (data, ctx) => {
        // Get language
        const datas = data.split('~');
        if (datas[0] !== 'l')
            return;
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx, true);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        // Save language
        chat.language = datas[1];
        chat = await chat.save();
        // Update message
        await ctx.telegram.editMessageText(ctx.chat.id, ctx.update.callback_query.message.message_id, undefined, locale_1.loc('language_selected_randy', chat.language));
    });
}
exports.setupLanguageCallback = setupLanguageCallback;
/**
 * Language keyboard
 * @returns language keyboard
 */
function getButtons() {
    return {
        inline_keyboard: [
            [
                {
                    text: 'English',
                    callback_data: `l~en`,
                },
                {
                    text: 'Русский',
                    callback_data: `l~ru`,
                },
            ],
            [
                {
                    text: 'Português',
                    callback_data: `l~pt`,
                },
                {
                    text: 'Turkce',
                    callback_data: `l~tr`,
                },
            ],
            [
                {
                    text: 'Українська',
                    callback_data: `l~uk`,
                },
                {
                    text: 'Arabic',
                    callback_data: `l~ar`,
                },
            ],
            [
                {
                    text: 'Español',
                    callback_data: `l~es`,
                },
            ],
        ],
    };
}
//# sourceMappingURL=language.js.map