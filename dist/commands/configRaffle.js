"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
function setupConfigRaffle(bot) {
    bot.hears('Настройки розыгрыша', async (ctx) => {
        // Check if private
        if (ctx.chat.type !== 'private') {
            return;
        }
        // Get chat
        const chat = await chat_1.findChat(ctx.chat.id);
        // Check if there is a choice
        if (!chat.adminChatIds.length) {
            return ctx.reply(locale_1.loc('config_raffle_no_chats', chat.language));
        }
        // Add choices
        const editedChats = (await Promise.all(chat.adminChatIds.map(async (id) => {
            try {
                const edittedChat = await ctx.telegram.getChat(id);
                return edittedChat;
            }
            catch (_a) {
                return undefined;
            }
        }))).filter((v) => !!v);
        const options = editedChats.map((c) => [
            {
                text: c.title,
                callback_data: `c~${c.id}`,
            },
        ]);
        options.push([
            {
                text: locale_1.loc('private_messages', chat.language),
                callback_data: 'this_chat',
            },
        ]);
        // Send chat selection
        ctx.reply(locale_1.loc('select_chat', chat.language), {
            reply_markup: {
                inline_keyboard: options,
            },
        });
    });
    bot.action('this_chat', async (ctx) => {
        try {
            await ctx.answerCbQuery();
        }
        catch (err) {
            try {
                await ctx.deleteMessage();
            }
            catch (_a) {
                // Do nothing
            }
        }
        const chat = await chat_1.findChat(ctx.chat.id);
        chat.editedChatId = undefined;
        await chat.save();
        return ctx.reply(locale_1.loc('now_editing_this_chat', chat.language));
    });
    bot.action(/c~.+/, async (ctx) => {
        try {
            await ctx.answerCbQuery();
        }
        catch (err) {
            try {
                await ctx.deleteMessage();
            }
            catch (_a) {
                // Do nothing
            }
        }
        // Get this chat
        const chat = await chat_1.findChat(ctx.chat.id);
        // Get the edited chat
        const editedChatId = +ctx.callbackQuery.data.substr(2);
        const editedChat = await ctx.telegram.getChat(editedChatId);
        // Get this user from the edited chat
        const userFromChat = await ctx.telegram.getChatMember(editedChatId, ctx.from.id);
        // Check if user is an admin
        if (!['creator', 'administrator'].includes(userFromChat.status)) {
            await ctx.deleteMessage();
            return ctx.reply(locale_1.loc('mustBeAnAdmin', chat.language));
        }
        // Set edited chat
        chat.editedChatId = editedChat.id;
        await chat.save();
        const { Keyboard } = require('telegram-keyboard');
        const keyboard = Keyboard.make([
            ['Изменить количество победителей', 'Изменить текст розыгрыша'],
            ['Изменить текст при окончании розыгрыша'],
        ]);
        return ctx.reply(`${locale_1.loc('now_editing_this_chat', chat.language)}: ${editedChat.title}`, keyboard.reply());
    });
}
exports.setupConfigRaffle = setupConfigRaffle;
//# sourceMappingURL=configRaffle.js.map