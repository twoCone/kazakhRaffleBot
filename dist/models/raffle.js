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
// Winner class definition
class Raffle extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true, index: true }),
    __metadata("design:type", Number)
], Raffle.prototype, "chatId", void 0);
__decorate([
    typegoose_1.prop({ index: true }),
    __metadata("design:type", Number)
], Raffle.prototype, "messageId", void 0);
__decorate([
    typegoose_1.arrayProp({ required: true, default: [], items: Number }),
    __metadata("design:type", Array)
], Raffle.prototype, "participantsIds", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Raffle.prototype, "winners", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Raffle.prototype, "raffleMessage", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Raffle.prototype, "winnerMessage", void 0);
exports.Raffle = Raffle;
// Get Raffle model
const RaffleModel = new Raffle().getModelForClass(Raffle);
/**
 * Adding new raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns created raffle
 */
async function addRaffle(chatId) {
    let raffle = new RaffleModel({ chatId });
    return raffle.save();
}
exports.addRaffle = addRaffle;
/**
 * Getting existing raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns requested raffle
 */
async function getRaffle(chatId, id) {
    try {
        const raffle = await RaffleModel.findById(id);
        if (raffle) {
            return raffle;
        }
    }
    catch (err) {
        return RaffleModel.findOne({ chatId, messageId: Number(id) });
    }
}
exports.getRaffle = getRaffle;
//# sourceMappingURL=raffle.js.map