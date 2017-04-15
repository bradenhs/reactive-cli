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
var AppModel_1 = require("./models/AppModel");
var fnx_1 = require("fnx");
var axios_1 = require("axios");
var boxen = require("boxen");
var app = new AppModel_1.AppModel({
    transactions: {}
});
var term = terminalKit.terminal;
setInterval(function () { return 0; }, 100);
start();
var STATUS_BAR_HEIGHT = 7;
term.clear();
term.moveTo(1, STATUS_BAR_HEIGHT);
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    term.clear();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, createTransaction()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createTransaction() {
    return __awaiter(this, void 0, void 0, function () {
        var amount, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startQuestion();
                    return [4 /*yield*/, inquirer.prompt({
                            type: 'input',
                            name: 'answer',
                            message: 'How much did you spend?',
                            validate: function (input) { return /\d+/.test(input) ? true : 'Should be a number'; }
                        })];
                case 1:
                    amount = (_a.sent()).answer;
                    id = app.createTransaction(parseFloat(amount));
                    setTransactionLocation(id);
                    return [2 /*return*/];
            }
        });
    });
}
function setTransactionLocation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get('http://geoip.nekudo.com/api')];
                case 1:
                    res = _a.sent();
                    app.transactions[id].setLocation(res.data.city);
                    return [2 /*return*/];
            }
        });
    });
}
function startQuestion() {
    term.clear();
    renderStatusBar();
    term.moveTo(1, STATUS_BAR_HEIGHT);
}
fnx_1.reaction(function () {
    renderStatusBar();
});
function renderStatusBar() {
    term.saveCursor();
    term.moveTo(1, 1);
    erase(1, STATUS_BAR_HEIGHT);
    var output = 'Total $' + app.getTotal() + '\n';
    var lastTransactionLocation = 'None';
    if (app.getMostRecentTransaction() != undefined) {
        lastTransactionLocation = app.getMostRecentTransaction().location;
    }
    output += 'Last transaction location: ' + (lastTransactionLocation || 'Fetching...');
    term(boxen(output, {
        padding: 1,
        borderColor: 'cyan'
    }));
    term.restoreCursor();
}
function erase(from, until) {
    term.saveCursor();
    for (var line = from; line <= until; line++) {
        term.moveTo(1, line);
        term.eraseLine();
    }
    term.restoreCursor();
}
