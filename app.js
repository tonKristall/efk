"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./category/router"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = process.env.PORT || 3211;
var cloudinary = require('cloudinary').v2;
app.use(cors_1.default());
app.use('/', router_1.default);
app.listen(PORT, () => console.log('server'));
//# sourceMappingURL=app.js.map