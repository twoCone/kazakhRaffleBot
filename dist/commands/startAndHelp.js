"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin_1 = require("../helpers/checkAdmin");
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
/**
 * Setting up the start and help commands
 * @param bot Bot to setup the commands
 */
function setupStartAndHelp(bot) {
    bot.command(['start', 'help'], async (ctx) => {
        // Check if admin
        const isAdmin = await checkAdmin_1.checkIfAdmin(ctx);
        if (!isAdmin)
            return;
        // Get chat
        const chat = await chat_1.findChat(ctx.chat.id);
        // Reply
        const text = locale_1.loc('public_help_start', chat.language);
        const { Keyboard } = require('telegram-keyboard');
        const keyboard = Keyboard.make([
            ['Создать розыгрыш', 'Настройки розыгрыша'],
            ['Добавить чат для розыгрыша'],
        ]);
        ctx.reply(text, keyboard.reply());
    });
}
exports.setupStartAndHelp = setupStartAndHelp;
//# sourceMappingURL=startAndHelp.js.map