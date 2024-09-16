"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumInput = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number()
});
exports.app.post('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = sumInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            msg: "Wrong Input types"
        });
    }
    const a = parsedInput.data.a;
    console.log(a);
    const b = parsedInput.data.b;
    console.log(b);
    const answer = a + b;
    console.log("Answer::->  ", answer);
    res.status(200).json({
        a,
        b,
        sum: answer
    });
}));
exports.app.get('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = sumInput.safeParse({
        a: Number(req.headers['a']),
        b: Number(req.headers['b'])
    });
    if (!parsedInput.success) {
        return res.status(411).json({
            msg: "Incorrect Input"
        });
    }
    const answer = parsedInput.data.a + parsedInput.data.b;
    res.json({
        answer
    });
}));
// app.listen(3000, () => {
//     console.log('backend running on port 3000');
// });
