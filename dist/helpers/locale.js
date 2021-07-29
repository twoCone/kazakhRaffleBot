"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loc(text, language) {
    return exports.localizations[text][language] || exports.localizations[text].en;
}
exports.loc = loc;
exports.localizations = {
    public_help_start: {
        ru: 'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можете использовать формат `/number 100`).\n\n1. Отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nЕсли вы хотите проверять подписку на определенный канал перед тем, как разрешить человеку участвовать, настройте эту функцию командой в формате `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. Если вы хотите отключить эту функцию, напишите /nosubscribe. Хотите настроить собственное сообщение о розыгрыше? Используйте /raffleMessage. Хотите использовать обычное сообщение о розыгрыше? Используйте /noRaffleMessage. /winnerMessage и /noWinnerMessage работают так же.  Используйте /nodelete, если хотите оставить оригинальное сообшение.\n\nХотите настроить розыгрыш, но не хотите засорять сообщениями настройки чат или канал? Вы можете сделать это в личных сообщениях со мной. Просто пришлите мне в личные сообщения форвард любого канала или чата, где вы админ (или пришлите сообщение формата `/addChat 123456789` или `/addChat @borodutcher`). После, выберите канал или чат, который хотите настраивать, при помощи команды /configRaffle. Дальше присылайте мне в личные сообщения настройки, описанные выше, чтобы настраивать розыгрыш в выбранном чате.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch\\_support 🦄\n\nПопробуйте еще один мой проект — [Тудурант](https://todorant.com) ([iOS](https://apps.apple.com/ru/app/todorant/id1482078243), [Андроид](https://play.google.com/store/apps/details?id=com.todorant)). Это умный список задач, который использует поведенческую психологию для того, чтобы заставить ваш мозг выполнять задачи. Полностью бесплатен 30 дней без каких-либо обязательств, поэтому почему бы не попробовать улучшить свою продуктивность? Тудурант помог мне, поможет и вам!',
        en: "Дарова заебал! Я казахский бот, который поможет тебе устроить розыгрыш у тебя на канале/чате.\n\n Короче, далбоеб, чтобы начать розыгрыш просто введи у себя в чатике команду /beginRaffle\n\n Чтобы завершить просто ответь на то сообщение (любым сообщением). Не волнуйся все за собой почищу мгновенно, никто даже не увидит эти сообщения.\n\nЕсли будут доп вопросы пиши - @twoCone, Бот еще тестится",
    },
    no_work_private: {
        ru: 'Простите, но эта команда не работает в личке с ботом.',
        en: 'Дружище, ну ты чего я же сказал надо у себя в чате написать /beginRaffle',
    },
    select_language: {
        ru: 'Пожалуйста, выберите язык',
        en: 'Please, select the language',
    },
    language_selected_randy: {
        ru: 'Спасибо, теперь я говорю по-русски!',
        en: 'Thank you! Now I speak English',
    },
    raffle_text: {
        ru: 'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победитель будет выбран случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
        en: 'Do you want to get some money?)',
    },
    raffle_text_multiple: {
        ru: 'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победители будут выбраны случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
        en: 'Do you want to get some money?)',
    },
    please_retry: {
        ru: 'Пожалуйста, попробуйте через пару минут',
        en: 'Пожалуйста, попробуйте через пару минут',
    },
    already_participating: {
        ru: 'Вы уже принимаете участие, отлично!',
        en: 'You are already participating, wonderful!',
    },
    participated: {
        ru: 'Отлично, вы отметились, как участник!',
        en: 'Great, you are now participating in this raffle!',
    },
    participants_number: {
        ru: 'Количество участников',
        en: 'Number of participants',
    },
    participate_button: {
        ru: 'Участвовать!',
        en: 'Participate!',
    },
    no_participants: {
        ru: 'В этот раз участников розыгрыша не было 😅',
        en: 'No participants this time 😅',
    },
    winner: {
        ru: 'В этот раз победитель',
        en: 'The winner is',
    },
    winners: {
        ru: 'В этот раз победители',
        en: 'The winners are',
    },
    congratulations: {
        ru: 'Поздравляем',
        en: 'Congratulations',
    },
    raffle_over: {
        ru: 'Простите, но розыгрыш уже закончен',
        en: 'Sorry, the raffle is over now',
    },
    select_number: {
        ru: 'Пожалуйста, выберите, сколько победителей должно быть в розыгрыше',
        en: 'Сколько победителей хош?',
    },
    number_selected: {
        ru: 'Отлично, вы выбрали количество победителей!',
        en: "Хорош, хоть с этим справился",
    },
    not_enough_participants: {
        ru: 'В этот раз участников розыгрыша было недостаточно 😅',
        en: 'Not enough participants this time 😅',
    },
    subscribe_format: {
        ru: 'Пожалуйста, укажите хендл канала, на который надо проверять подписку, в формате `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`.',
        en: 'На какой канал чекнуть подписку ?',
    },
    nosubscribe_success: {
        ru: 'Ренди не будет проверять подписку на какой-либо канал.',
        en: 'Я не буду проверять на подписку',
    },
    bot_not_admin: {
        ru: 'Пожалуйста, сделайте @randymbot админом в этом чате.',
        en: 'Бро сперва сделай меня админом в этом чате',
    },
    bot_not_admin_chat: {
        en: 'Бро сперва сделай меня админом в этом чате ',
        tr: 'Lütfen, @randymbot u yönetici yapın',
    },
    subscribe_success: {
        ru: 'Отлично, теперь бот будет проверять подписку пользователя на следующий канал перед разрешением участвовать в конкурсе: ',
        en: 'Найс, я буду проверять подписку на канал ',
    },
    check_subscription: {
        ru: 'Вы должны быть подписаны на ',
        en: 'You should be subscribed to ',
    },
    raffle_message: {
        en: 'Бро, укажи сообщение которе будет отображаться в розыгрыше(Чтобы это сделать ОТВЕТЬ/REPLY на это сообщени, то есть не просто так отправь, а именно нажми "Ответить").ОБЯЗАТЕЛЬНО в твоем сообщение должна быть переменная $numberOfParticipants отвечающяя за подсчет участников розыгрыша💪. ',
        ru: 'Ответьте на это сообщение, чтобы установить новое сообщение розыгрыша. Именно ответьте (надеемся, что все понимают разницу между обычным сообщением и ответом). Обязательно используйте "$numberOfParticipants" без кавычек в сообщении — иначе установка не сработает. Удачи! 💪 Текущее сообщение (если оно установленно), приведено ниже.',
    },
    raffle_message_off: {
        ru: 'Теперь Ренди будет использовать стандартное сообщение о розыгрыше.',
        en: 'Я буду юзать стандартное сообщение.',
    },
    winner_message: {
        en: 'Йоу, укажи сообщение для победителя/победителей (надо "Ответить" на это сообщение).Также ОБЯЗАТЕЛЬНО в этом сообщение должны быть переменные $numberOfParticipants и $winner.💪',
        tr: 'Özel bir kazanan mesajı ayarlamak için bu iletiyi yanıtlayın. Bu iletiyi yanıtladığınızdan emin olun (umarız herkes "yanıt" kelimesinin ne anlama geldiğini biliyordur). İletinizde tırnak işaretleri olmadan  "$numberOfParticipants" ve "$winner" mesajının geçtiğinden emin olun —  onlarsız çalışmaz. Kapiş! 🎉 Geçerli kazanan mesajı (ayarlanmışsa) aşağıdadır:',
    },
    winner_message_off: {
        ru: 'Теперь Ренди будет использовать стандартное сообщение о победе.',
        en: 'Хорошо сообщения не будет',
    },
    success: {
        ru: 'Успех!',
        en: 'Success!',
    },
    nodelete_true: {
        ru: 'Теперь Ренди не будет редактировать (удалять) оригинальное сообщение.',
        en: 'Now Randy will not edit (delete) original message.',
    },
    nodelete_false: {
        ru: 'Теперь Ренди будет редактировать (удалять) оригинальное сообщение.',
        en: 'Now Randy will edit (delete) original message.',
    },
    mustBeAnAdmin: {
        en: 'Ты должен быть админом',
        ru: 'Вы должны быть админом в чате',
    },
    config_raffle_instructions: {
        en: 'Бро выбери чат который будем настраивать',
        ru: 'Успех! Теперь выберите канал или чат, который хотите настроить, при помощи команды /configRaffle',
    },
    config_raffle_no_chats: {
        en: 'Можешь сперва переслать мне сообщение с кАНАЛа/чата',
        ru: 'Сначала перешлите мне форвард сообщения из чата или канала, который хотите настроить',
    },
    select_chat: {
        en: 'Выбери чат',
        ru: 'Выберите чат или канал, который хотите настроить',
    },
    private_messages: {
        en: 'Приватные сообщения',
        ru: 'Приватные сообщения',
    },
    now_editing_this_chat: {
        en: 'Найс, теперь мы настраиваем этот чат',
        ru: 'Отлично! Теперь вы редактируете настройки этого чата',
    },
};
//# sourceMappingURL=locale.js.map