"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../models/chat");
const locale_1 = require("./locale");
const checkIfEditedAdmin_1 = require("./checkIfEditedAdmin");
const checkAdmin_1 = require("./checkAdmin");
async function getChatIdForConfig(ctx, shouldAllowCommandInPrivate = false) {
    if (ctx.chat.type === 'private') {
        // Get private chat
        const privateChat = await chat_1.findChat(ctx.chat.id);
        // Check if in editing mode
        if (!privateChat.editedChatId) {
            if (shouldAllowCommandInPrivate) {
                return privateChat.chatId;
            }
            else {
                await ctx.reply(locale_1.loc('config_raffle_no_chats', privateChat.language));
                return undefined;
            }
        }
        else {
            // Check if admin
            if (!(await checkIfEditedAdmin_1.checkIfAdminInChat(ctx, ctx.from.id, privateChat.editedChatId))) {
                await ctx.reply(locale_1.loc('mustBeAnAdmin', privateChat.language));
                return undefined;
            }
            // Return chat id
            return privateChat.editedChatId;
        }
    }
    else {
        // Check if admin
        const isAdmin = await checkAdmin_1.checkIfAdmin(ctx);
        if (!isAdmin) {
            return undefined;
        }
        // Return chatId
        return ctx.chat.id;
    }
}
exports.getChatIdForConfig = getChatIdForConfig;
//# sourceMappingURL=getChatIdForConfig.js.map