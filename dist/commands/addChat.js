"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
function setupAddChat(bot) {
    bot.hears('Добавить чат для розыгрыша', async (ctx) => {
        // Check if private
        if (ctx.message.chat.type !== 'private') {
            return;
        }
        // Get randy
        const randy = await ctx.telegram.getMe();
        const thisChat = await chat_1.findChat(ctx.chat.id);
        // Get chat id
        let chatId = ctx.message.text.split(' ')[1];
        if (!chatId) {
            return;
        }
        if (!isNaN(+chatId)) {
            chatId = +chatId;
        }
        // Check if randy is an admin there
        const randyMember = await ctx.telegram.getChatMember(chatId, randy.id);
        if (randyMember.status !== 'administrator') {
            return ctx.reply(locale_1.loc('bot_not_admin_chat', thisChat.language));
        }
        // Check if user is administrator in that chat
        const chatMember = await ctx.telegram.getChatMember(chatId, ctx.from.id);
        if (!['administrator', 'creator'].includes(chatMember.status)) {
            return ctx.reply(locale_1.loc('mustBeAnAdmin', thisChat.language));
        }
        // Add that chat to user's admin privelege
        const gotChat = await ctx.telegram.getChat(chatId);
        if (!thisChat.adminChatIds.includes(gotChat.id)) {
            thisChat.adminChatIds.push(gotChat.id);
        }
        await thisChat.save();
        // Reply with success
        return ctx.reply(locale_1.loc('config_raffle_instructions', thisChat.language));
    });
}
exports.setupAddChat = setupAddChat;
//# sourceMappingURL=addChat.js.map