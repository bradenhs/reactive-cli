"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var terminalKit = require("terminal-kit");
var axios_1 = require("axios");
var statusBar_1 = require("./statusBar");
var app_1 = require("./app");
var AppModel_1 = require("./models/AppModel");
var fnx_1 = require("fnx");
var term = terminalKit.terminal;
start();
function start() {
    var views = (_a = {},
        _a[AppModel_1.View.CHOOSE_NAME] = displayChooseName,
        _a[AppModel_1.View.JOIN_OR_CREATE_SELECTION] = displayJoinOrCreateSelection,
        _a[AppModel_1.View.CREATE_BUDGET] = displayCreateBudget,
        _a[AppModel_1.View.JOIN_BUDGET] = displayJoinBudget,
        _a[AppModel_1.View.WITHDRAW_OR_DEPOSIT_SELECTION] = displayWithdrawOrDepositSelection,
        _a[AppModel_1.View.DEPOSIT] = displayDepositSelection,
        _a[AppModel_1.View.WITHDRAW] = displayWithdrawSelection,
        _a);
    statusBar_1.initStatusBar();
    fnx_1.default.reaction(function () {
        term.moveTo(1, statusBar_1.STATUS_BAR_HEIGHT + 4);
        term.eraseDisplayBelow();
        views[app_1.app.view]();
    });
    var _a;
}
function displayChooseName() {
    return __awaiter(this, void 0, void 0, function () {
        var name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({ name: 'name', message: 'Choose your name' })];
                case 1:
                    name = (_a.sent()).name;
                    app_1.app.transaction(function () {
                        app_1.app.setUserName(name);
                        app_1.app.setView(AppModel_1.View.JOIN_OR_CREATE_SELECTION);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function displayJoinOrCreateSelection() {
    return __awaiter(this, void 0, void 0, function () {
        var choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({
                        name: 'choice',
                        message: 'Would you like to create a new budget or join an existing one?',
                        type: 'list',
                        choices: ['Join', 'Create']
                    })];
                case 1:
                    choice = (_a.sent()).choice;
                    if (choice === 'Join') {
                        app_1.app.setView(AppModel_1.View.JOIN_BUDGET);
                    }
                    else {
                        app_1.app.setView(AppModel_1.View.CREATE_BUDGET);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function displayCreateBudget() {
    return __awaiter(this, void 0, void 0, function () {
        var name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({
                        name: 'name', message: 'Pick a name for your budget'
                    })];
                case 1:
                    name = (_a.sent()).name;
                    app_1.app.transaction(function () {
                        app_1.app.createBudget(name);
                        app_1.app.setView(AppModel_1.View.WITHDRAW_OR_DEPOSIT_SELECTION);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function displayJoinBudget() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            throw new Error('Right now this does not work');
        });
    });
}
function displayWithdrawOrDepositSelection() {
    return __awaiter(this, void 0, void 0, function () {
        var choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({
                        name: 'choice',
                        message: 'Would you like to record a withdrawl or deposit?',
                        type: 'list',
                        choices: ['Widthdraw', 'Deposit']
                    })];
                case 1:
                    choice = (_a.sent()).choice;
                    if (choice === 'Widthdraw') {
                        app_1.app.setView(AppModel_1.View.WITHDRAW);
                    }
                    else {
                        app_1.app.setView(AppModel_1.View.DEPOSIT);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function displayDepositSelection() {
    return __awaiter(this, void 0, void 0, function () {
        var amount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({
                        name: 'amount',
                        message: 'How much would you like to deposit?'
                    })];
                case 1:
                    amount = (_a.sent()).amount;
                    app_1.app.transaction(function () {
                        createTransaction(parseFloat(amount));
                        app_1.app.setView(AppModel_1.View.WITHDRAW_OR_DEPOSIT_SELECTION);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function displayWithdrawSelection() {
    return __awaiter(this, void 0, void 0, function () {
        var amount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt({
                        name: 'amount',
                        message: 'How much would you like to withdraw?'
                    })];
                case 1:
                    amount = (_a.sent()).amount;
                    app_1.app.transaction(function () {
                        createTransaction(-parseFloat(amount));
                        app_1.app.setView(AppModel_1.View.WITHDRAW_OR_DEPOSIT_SELECTION);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function createTransaction(amount) {
    var id = app_1.app.budget.createTransaction(amount);
    setTransactionLocation(id);
}
function setTransactionLocation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get('http://geoip.nekudo.com/api')];
                case 1:
                    res = _a.sent();
                    app_1.app.budget.transactions[id].setLocation(res.data.city);
                    return [2 /*return*/];
            }
        });
    });
}
