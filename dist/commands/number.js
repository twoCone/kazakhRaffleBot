"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
const getChatIdForConfig_1 = require("../helpers/getChatIdForConfig");
/**
 * Setting up the number command
 * @param bot Bot to setup the command
 */
function setupNumber(bot) {
    bot.hears('Изменить количество победителей', async (ctx) => {
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        // Check if `/number XXX` format
        const numberString = (ctx.message || ctx.channelPost).text.substr(8).trim();
        if (numberString &&
            !isNaN(+numberString) &&
            +numberString > 0 &&
            +numberString < 10000000) {
            chat.number = +numberString;
            chat = await chat.save();
            // Reply
            return ctx.reply(locale_1.loc('number_selected', chat.language), {
                disable_notification: true,
            });
        }
        // Reply
        return ctx.reply(locale_1.loc('select_number', chat.language), {
            reply_markup: getButtons(),
            disable_notification: true,
        });
    });
}
exports.setupNumber = setupNumber;
/**
 * Setting up callback for the number keyboard
 * @param bot Bot to setup the callback
 */
function setupNumberCallback(bot) {
    ;
    bot.action(async (data, ctx) => {
        // Get raffle
        const datas = data.split('~');
        if (datas[0] !== 'n')
            return;
        // Get chat id
        const chatId = await getChatIdForConfig_1.getChatIdForConfig(ctx);
        if (!chatId) {
            return;
        }
        // Get chat
        let chat = await chat_1.findChat(chatId);
        // Save language
        chat.number = Number(datas[1]);
        chat = await chat.save();
        // Update message
        await ctx.telegram.editMessageText(ctx.chat.id, ctx.update.callback_query.message.message_id, undefined, locale_1.loc('number_selected', chat.language));
    });
}
exports.setupNumberCallback = setupNumberCallback;
/**
 * Language keyboard
 * @returns language keyboard
 */
function getButtons() {
    return {
        inline_keyboard: [
            [
                { text: '1', callback_data: `n~1` },
                { text: '2', callback_data: `n~2` },
                { text: '3', callback_data: `n~3` },
                { text: '4', callback_data: `n~4` },
            ],
            [
                { text: '5', callback_data: `n~5` },
                { text: '6', callback_data: `n~6` },
                { text: '7', callback_data: `n~7` },
                { text: '8', callback_data: `n~8` },
            ],
            [
                { text: '9', callback_data: `n~9` },
                { text: '10', callback_data: `n~10` },
                { text: '11', callback_data: `n~11` },
                { text: '12', callback_data: `n~12` },
            ],
        ],
    };
}
//# sourceMappingURL=number.js.map