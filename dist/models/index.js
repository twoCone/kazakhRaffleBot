"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const mongoose = require("mongoose");
// Connect to mongoose
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
// Get models
const raffle_1 = require("./raffle");
exports.addRaffle = raffle_1.addRaffle;
exports.getRaffle = raffle_1.getRaffle;
exports.Raffle = raffle_1.Raffle;
//# sourceMappingURL=index.js.map