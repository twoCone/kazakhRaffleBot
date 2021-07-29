"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function checkIfAdminInChat(ctx, userId, chatId) {
    try {
        const member = await ctx.telegram.getChatMember(chatId, userId);
        return ['administrator', 'creator'].includes(member.status);
    }
    catch (_a) {
        return false;
    }
}
exports.checkIfAdminInChat = checkIfAdminInChat;
//# sourceMappingURL=checkIfEditedAdmin.js.map