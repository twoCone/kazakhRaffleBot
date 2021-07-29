"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const lodash_1 = require("lodash");
const checkAdmin_1 = require("./checkAdmin");
const chat_1 = require("../models/chat");
const locale_1 = require("./locale");
/**
 * Starting a new raffle
 * @param ctx Context of the message that started
 */
async function startRaffle(ctx) {
    // Get chat
    const chat = await chat_1.findChat(ctx.chat.id);
    // Add raffle
    const raffle = await models_1.addRaffle(ctx.chat.id);
    // Save raffle message if required
    if (chat.raffleMessage) {
        raffle.raffleMessage = chat.raffleMessage;
        await raffle.save();
    }
    if (chat.winnerMessage) {
        raffle.winnerMessage = chat.winnerMessage;
        await raffle.save();
    }
    // Add buttons
    const options = {
        reply_markup: getButtons(raffle, chat.language),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
    };
    // Send message
    let sent;
    if (raffle.raffleMessage) {
        const raffleMessage = raffle.raffleMessage;
        if (raffleMessage.text) {
            raffleMessage.text = raffleMessage.text.replace('$numberOfParticipants', '0');
        }
        else {
            raffleMessage.caption = raffleMessage.caption.replace('$numberOfParticipants', '0');
        }
        sent = await ctx.telegram.sendCopy(ctx.chat.id, raffleMessage, {
            reply_markup: getButtons(raffle, chat.language),
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });
    }
    else {
        sent = await ctx.replyWithHTML(locale_1.loc(chat.number > 1 ? 'raffle_text_multiple' : 'raffle_text', chat.language), options);
    }
    // Save sent message id
    raffle.messageId = sent.message_id;
    await raffle.save();
}
exports.startRaffle = startRaffle;
/**
 * Setting up callback for the raffle participation button
 * @param bot Bot to setup the callback
 */
function setupCallback(bot) {
    ;
    bot.action(async (data, ctx) => {
        // Get raffle
        const datas = data.split('~');
        if (['l', 'n', 'c'].indexOf(datas[0]) > -1)
            return;
        const chatId = Number(datas[0]);
        let raffle = await models_1.getRaffle(chatId, datas[1]);
        // Get chat
        const chat = await chat_1.findChat(ctx.chat.id);
        // Check if raffle is there
        if (!raffle) {
            await ctx.answerCbQuery(locale_1.loc('please_retry', chat.language), undefined, true);
            return;
        }
        // Check if raffle is finished
        if (raffle.winners) {
            await ctx.answerCbQuery(locale_1.loc('raffle_over', chat.language), undefined, true);
            return;
        }
        // Check if already in
        if (raffle.participantsIds.indexOf(ctx.from.id) > -1) {
            await ctx.answerCbQuery(locale_1.loc('already_participating', chat.language), undefined, true);
            return;
        }
        // Check if participant subscribed
        if (chat.subscribe) {
            for (const subscribe of chat.subscribe.split(',')) {
                try {
                    const member = await ctx.telegram.getChatMember(`${!isNaN(+subscribe) ? '' : '@'}${subscribe}`, ctx.from.id);
                    if (!member.status ||
                        member.status === 'left' ||
                        member.status === 'kicked') {
                        throw new Error();
                    }
                }
                catch (err) {
                    return ctx.answerCbQuery(`${locale_1.loc('check_subscription', chat.language)}${!isNaN(+subscribe) ? '' : '@'}${subscribe}`, undefined, true);
                }
            }
        }
        // Add participant and update number
        raffle.participantsIds.push(ctx.from.id);
        raffle = await raffle.save();
        // Reply that they are in
        await ctx.answerCbQuery(locale_1.loc('participated', chat.language), undefined, true);
        // Update counter of participants
        try {
            // Add buttons
            const options = {
                reply_markup: getButtons(raffle, chat.language),
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            };
            let text;
            if (raffle.raffleMessage) {
                const raffleMessage = raffle.raffleMessage;
                text = raffleMessage.text
                    ? raffleMessage.text.replace('$numberOfParticipants', `${raffle.participantsIds.length}`)
                    : raffleMessage.caption.replace('$numberOfParticipants', `${raffle.participantsIds.length}`);
            }
            else {
                text = `${locale_1.loc(chat.number > 1 ? 'raffle_text_multiple' : 'raffle_text', chat.language)}\n\n${locale_1.loc('participants_number', chat.language)}: ${raffle.participantsIds.length}`;
            }
            if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, options);
            }
            else {
                await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, options);
            }
        }
        catch (err) {
            // Do nothing
        }
    });
}
exports.setupCallback = setupCallback;
/**
 * Setting up listener for the raffle endings
 * @param bot
 */
function setupListener(bot) {
    bot.use(async (ctx, next) => {
        try {
            const message = ctx.message || ctx.channelPost;
            // Check if reply to bot's message
            if (!message ||
                !message.reply_to_message ||
                (!message.reply_to_message.text && !message.reply_to_message.caption)) {
                throw new Error('Not checking');
            }
            // Check if admin replied
            const isAdmin = await checkAdmin_1.checkIfAdmin(ctx, false);
            if (!isAdmin) {
                throw new Error('No admin');
            }
            // Get reply message
            const reply = message.reply_to_message;
            // Check if there is raffle to the reply message
            const raffle = await models_1.getRaffle(reply.chat.id, reply.message_id);
            if (message.text.includes('finish')) {
                await ctx.deleteMessage();
            }
            if (!raffle) {
                throw new Error('No raffle');
            }
            // Check if no winner yet
            if (raffle.winners) {
                throw new Error('No winners');
            }
            // Finish raffle
            await finishRaffle(raffle, ctx);
        }
        catch (err) {
            // Do nothing
        }
        finally {
            // Continue
            next();
        }
    });
}
exports.setupListener = setupListener;
/**
 * Buttons for a raffle
 * @param raffle Raffle to provide buttons to
 * @param language Languageof thebuttons
 * @returns buttons for a raffle
 */
function getButtons(raffle, language) {
    return {
        inline_keyboard: [
            [
                {
                    text: locale_1.loc('participate_button', language),
                    callback_data: `${raffle.chatId}~${raffle.id}`,
                },
            ],
        ],
    };
}
/**
 * Finishing raffle
 * @param raffle Raffle to finish
 * @param ctx Context of message that finished raffle
 */
async function finishRaffle(raffle, ctx) {
    console.log(`Finishing raffle for chat ${raffle.chatId}`);
    // Get participants ids
    let ids = raffle.participantsIds;
    const idsOriginalLength = ids.length;
    // Get chat
    const chat = await chat_1.findChat(ctx.chat.id);
    const nodelete = chat.nodelete;
    // Check if there were participants
    if (ids.length <= 0) {
        const text = locale_1.loc('no_participants', chat.language);
        if (!nodelete) {
            if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, { disable_web_page_preview: true, parse_mode: 'HTML' });
            }
            else {
                await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, { disable_web_page_preview: true, parse_mode: 'HTML' });
            }
        }
        else {
            await ctx.telegram.sendMessage(raffle.chatId, text, {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });
        }
        return;
    }
    // Get winners
    ids = lodash_1.shuffle(ids);
    let winners = [];
    while (winners.length < chat.number) {
        // Check if not enough participants
        if (ids.length + winners.length < chat.number) {
            const text = locale_1.loc('not_enough_participants', chat.language);
            if (!nodelete) {
                if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                    await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, { disable_web_page_preview: true, parse_mode: 'HTML' });
                }
                else {
                    await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, { disable_web_page_preview: true, parse_mode: 'HTML' });
                }
            }
            else {
                await ctx.telegram.sendMessage(raffle.chatId, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
            return;
        }
        const winnerIndex = lodash_1.random(ids.length - 1);
        const winnerId = ids.splice(winnerIndex, 1)[0];
        try {
            const winner = await ctx.telegram.getChatMember(raffle.chatId, winnerId);
            const name = winner.user.username
                ? `@${winner.user.username}`
                : `${winner.user.first_name}${winner.user.last_name ? ` ${winner.user.last_name}` : ''}`;
            if (winners.map((w) => w.winner.user.id).indexOf(winner.user.id) < 0) {
                winners.push({ name, winner });
            }
        }
        catch (err) {
            // Do nothing
        }
    }
    winners = lodash_1.shuffle(winners);
    console.log(`Finishing raffle for chat ${raffle.chatId}, winners length: ${winners.length}`);
    // Save winners
    raffle.winners = winners.map((w) => w.winner.user.id).join(',');
    await raffle.save();
    // Announce winner
    if (winners.length == 1) {
        const winner = winners[0].winner;
        const name = winners[0].name.replace('<', '').replace('>', '');
        let text;
        if (raffle.winnerMessage) {
            text = raffle.winnerMessage.text
                .replace('$winner', `<a href="tg://user?id=${winner.user.id}">${name}</a>`)
                .replace('$numberOfParticipants', `${idsOriginalLength}`);
        }
        else {
            text = `🎉 ${locale_1.loc('winner', chat.language)} — <a href="tg://user?id=${winner.user.id}">${name}</a>! ${locale_1.loc('congratulations', chat.language)}!\n\n${locale_1.loc('participants_number', chat.language)} — ${idsOriginalLength}.`;
        }
        if (!nodelete) {
            if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
            else {
                await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
        }
        else {
            await ctx.telegram.sendMessage(raffle.chatId, text, {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });
        }
    }
    else {
        const names = winners.map((w) => w.name.replace('<', '').replace('>', ''));
        if (names.length <= 50 || raffle.winnerMessage) {
            let text;
            if (raffle.winnerMessage) {
                text = raffle.winnerMessage.text
                    .replace('$winner', names
                    .map((name, i) => `<a href="tg://user?id=${winners[i].winner.user.id}">${name}</a>`)
                    .join(', '))
                    .replace('$numberOfParticipants', `${idsOriginalLength}`);
            }
            else {
                text = `🎉 ${locale_1.loc('winners', chat.language)}:\n`;
                for (let i = 0; i < names.length; i++) {
                    text = `${text}\n${i + 1}. <a href="tg://user?id=${winners[i].winner.user.id}">${names[i]}</a>`;
                }
                text = `${text}\n\n${locale_1.loc('congratulations', chat.language)}!\n\n${locale_1.loc('participants_number', chat.language)} — ${idsOriginalLength}.`;
            }
            if (!nodelete) {
                if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                    await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });
                }
                else {
                    await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });
                }
            }
            else {
                await ctx.telegram.sendMessage(raffle.chatId, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
        }
        else {
            let commonI = 0;
            let text = `🎉 ${locale_1.loc('winners', chat.language)}:\n`;
            const firstNames = names.splice(0, 50);
            const firstWinners = winners.splice(0, 50);
            for (let i = 0; i < firstNames.length; i++) {
                commonI++;
                text = `${text}\n${commonI}. <a href="tg://user?id=${firstWinners[i].winner.user.id}">${firstNames[i]}</a>`;
            }
            text = `${text}\n\n${locale_1.loc('congratulations', chat.language)}!\n\n${locale_1.loc('participants_number', chat.language)} — ${idsOriginalLength}.`;
            console.log(`Announcing winners for ${raffle.chatId}`, raffle.messageId);
            if (!nodelete) {
                if (!raffle.raffleMessage || raffle.raffleMessage.text) {
                    await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });
                }
                else {
                    await ctx.telegram.editMessageCaption(raffle.chatId, raffle.messageId, undefined, text, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });
                }
            }
            else {
                await ctx.telegram.sendMessage(raffle.chatId, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
            while (names.length > 0) {
                let text = ``;
                const nextNames = names.splice(0, 50);
                const nextWinners = winners.splice(0, 50);
                for (let i = 0; i < nextNames.length; i++) {
                    commonI++;
                    text = `${text}\n${commonI}. <a href="tg://user?id=${nextWinners[i].winner.user.id}">${nextNames[i]}</a>`;
                }
                await ctx.telegram.sendMessage(raffle.chatId, text, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
            }
        }
    }
}
//# sourceMappingURL=raffle.js.map