"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin_1 = require("../helpers/checkAdmin");
const raffle_1 = require("../helpers/raffle");
const chat_1 = require("../models/chat");
const locale_1 = require("../helpers/locale");
/**
 * Setting up the randy command
 * @param bot Bot to setup the command
 */
function setupRandy(bot) {
    bot.command('beginRaffle', async (ctx) => {
        // Check if admin
        const isAdmin = await checkAdmin_1.checkIfAdmin(ctx);
        if (!isAdmin)
            return;
        // Reply
        if (ctx.chat.type === 'private') {
            const chat = await chat_1.findChat(ctx.chat.id);
            ctx.reply(locale_1.loc('no_work_private', chat.language));
            return;
        }
        else {
            raffle_1.startRaffle(ctx);
            try {
                await ctx.deleteMessage();
            }
            catch (err) {
                // Do nothing
            }
        }
    });
}
exports.setupRandy = setupRandy;
//# sourceMappingURL=randy.js.map