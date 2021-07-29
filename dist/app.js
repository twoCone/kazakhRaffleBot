"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get environment variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });
const startAndHelp_1 = require("./commands/startAndHelp");
const randy_1 = require("./commands/randy");
const raffle_1 = require("./helpers/raffle");
const language_1 = require("./commands/language");
const number_1 = require("./commands/number");
const testLocales_1 = require("./commands/testLocales");
const subscribe_1 = require("./commands/subscribe");
const nosubscribe_1 = require("./commands/nosubscribe");
const raffleMessage_1 = require("./commands/raffleMessage");
const winnerMessage_1 = require("./commands/winnerMessage");
const nodelete_1 = require("./commands/nodelete");
const listenForForwards_1 = require("./helpers/listenForForwards");
const configRaffle_1 = require("./commands/configRaffle");
const addChat_1 = require("./commands/addChat");
const id_1 = require("./commands/id");
const telegraf = require('telegraf');
// Setup the bot
const bot = new telegraf(process.env.TOKEN, {
    username: process.env.USERNAME,
    channelMode: true,
});
bot.startPolling();
console.log('Bot is up and running');
// Setup callback
raffle_1.setupCallback(bot);
// Setup listeners
raffle_1.setupListener(bot);
listenForForwards_1.setupListenForForwards(bot);
// Setup commands
startAndHelp_1.setupStartAndHelp(bot);
randy_1.setupRandy(bot);
language_1.setupLanguage(bot);
number_1.setupNumber(bot);
testLocales_1.setupTestLocale(bot);
subscribe_1.setupSubscribe(bot);
nosubscribe_1.setupNosubscribe(bot);
raffleMessage_1.setupRaffleMessage(bot);
winnerMessage_1.setupWinnerMessage(bot);
nodelete_1.setupNodelete(bot);
configRaffle_1.setupConfigRaffle(bot);
addChat_1.setupAddChat(bot);
id_1.setupId(bot);
// Setup callbacks
language_1.setupLanguageCallback(bot);
number_1.setupNumberCallback(bot);
bot.catch(console.error);
//# sourceMappingURL=app.js.map