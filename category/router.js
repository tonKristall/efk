"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const status_1 = require("../status");
const category_1 = require("./category");
const repository_1 = require("./repository");
const router = express_1.Router();
const jsonParser = express_1.default.json();
router.post('/login', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.sendStatus(400);
    }
    ;
    status_1.statusPage.statusUser = repository_1.loginAdmin(req.body);
    res.json(status_1.statusPage.statusUser);
}));
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield repository_1.getCategories();
    res.json(categories);
}));
router.get('/categories/:nameCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameCategory = req.params.nameCategory;
    if (!nameCategory) {
        return res.sendStatus(400);
    }
    const cardsByCategory = yield repository_1.getCardsById(category_1.CATEGORIES.indexOf(nameCategory));
    if (!cardsByCategory) {
        return res.sendStatus(404);
    }
    res.json(cardsByCategory);
}));
router.delete('/:nameCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameCategory = req.params.nameCategory;
    if (!nameCategory) {
        return res.sendStatus(400);
    }
    try {
        yield repository_1.deleteCategory(category_1.CATEGORIES.indexOf(nameCategory));
    }
    catch (error) {
        return res.status(404).send(error);
    }
}));
router.post('/', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.body.nameCategory) {
        return res.sendStatus(400);
    }
    ;
    try {
        const nameCategory = req.body.nameCategory;
        yield repository_1.createCategory(nameCategory);
        return res.json(nameCategory);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=router.js.map