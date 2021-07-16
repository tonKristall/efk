"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.deleteCategory = exports.getCardsById = exports.getCategories = exports.loginAdmin = void 0;
const status_1 = require("../status");
const category_1 = require("./category");
function loginAdmin(data) {
    const userLogin = data.login;
    const userPassword = data.password;
    if (userLogin === status_1.AdminData.login && userPassword === status_1.AdminData.password) {
        return status_1.StatusUser.login;
    }
    else {
        return status_1.StatusUser.logout;
    }
}
exports.loginAdmin = loginAdmin;
function getCategories() {
    return Promise.resolve(category_1.CATEGORIES);
}
exports.getCategories = getCategories;
function getCardsById(id) {
    return Promise.resolve(category_1.CARDS[id]);
}
exports.getCardsById = getCardsById;
function deleteCategory(id) {
    const nameCategory = category_1.CATEGORIES[id];
    if (!nameCategory) {
        return Promise.reject(new Error('Category not found'));
    }
    category_1.CATEGORIES.splice(id, 1);
    category_1.CARDS.splice(id, 1);
    return Promise.resolve();
}
exports.deleteCategory = deleteCategory;
function createCategory(name) {
    if (category_1.CATEGORIES.indexOf(name) >= 0) {
        return Promise.reject(new Error(`Category ${name} already exists`));
    }
    category_1.CATEGORIES.push(name);
    category_1.CARDS.push([]);
    return Promise.resolve('Category created');
}
exports.createCategory = createCategory;
//# sourceMappingURL=repository.js.map