"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const typegoose_1 = require("typegoose");
class Chat extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true, index: true }),
    __metadata("design:type", Number)
], Chat.prototype, "chatId", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 'en' }),
    __metadata("design:type", String)
], Chat.prototype, "language", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 1 }),
    __metadata("design:type", Number)
], Chat.prototype, "number", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Chat.prototype, "subscribe", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "nodelete", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Chat.prototype, "raffleMessage", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Chat.prototype, "winnerMessage", void 0);
__decorate([
    typegoose_1.arrayProp({ required: true, default: [], items: Number }),
    __metadata("design:type", Array)
], Chat.prototype, "adminChatIds", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Chat.prototype, "editedChatId", void 0);
exports.Chat = Chat;
// Get Chat model
const ChatModel = new Chat().getModelForClass(Chat);
/**
 * Returns chat, creates one if required
 * @param chatId Chat id of the chat
 * @returns requestedchat
 */
async function findChat(chatId) {
    let chat = await ChatModel.findOne({ chatId });
    if (!chat) {
        chat = new ChatModel({ chatId });
        chat = await chat.save();
    }
    return chat;
}
exports.findChat = findChat;
//# sourceMappingURL=chat.js.map