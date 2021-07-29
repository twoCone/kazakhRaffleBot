"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const telegraf_1 = require("telegraf");
function setupTestLocale(bot) {
    bot.command('testLocales', async (ctx) => {
        if (ctx.from.id !== 76104711) {
            return;
        }
        const { loc, localizations } = require('../helpers/locale');
        for (const key of Object.keys(localizations)) {
            const value = localizations[key];
            for (const local of Object.keys(value)) {
                try {
                    await ctx.reply(loc(key, local), telegraf_1.Extra.markdown(true));
                }
                catch (err) {
                    console.log(key, local, err.message);
                }
            }
        }
        console.log('Done');
    });
}
exports.setupTestLocale = setupTestLocale;
//# sourceMappingURL=testLocales.js.map