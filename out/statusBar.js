"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var terminalKit = require("terminal-kit");
var boxen = require("boxen");
var chalk = require("chalk");
var app_1 = require("./app");
var AppModel_1 = require("./models/AppModel");
var fnx_1 = require("fnx");
var term = terminalKit.terminal;
exports.STATUS_BAR_HEIGHT = 6;
function initStatusBar() {
    term.clear();
    term.moveTo(exports.STATUS_BAR_HEIGHT, 1);
    fnx_1.default.reaction(function () {
        renderStatusBar();
    });
}
exports.initStatusBar = initStatusBar;
function renderStatusBar() {
    term.saveCursor();
    clearCurrentStatusBar();
    var status = '';
    if (app_1.app.view === AppModel_1.View.CHOOSE_NAME) {
        append('Name: ' + chalk.gray.italic('Not chosen'));
    }
    else {
        append('Name: ' + chalk.bold(app_1.app.userName));
    }
    if (app_1.app.budget != undefined) {
        append('Budget: ' + chalk.bold(app_1.app.budget.budgetName));
        append('Balance: ' + formatMoney(app_1.app.budget.getTotal()));
        append('Last Transaction: ' + formatTransaction(app_1.app.budget.getMostRecentTransaction()));
    }
    else {
        append('Budget: ' + chalk.gray.italic('No active budget'));
        append('Balance: ' + chalk.gray.italic('No active budget'));
        append('Last Transaction: ' + chalk.gray.italic('No active budget'));
    }
    term(boxen(status.trim(), {
        padding: 1, borderColor: 'cyan'
    }));
    term.restoreCursor();
    function append(line) {
        status += line + '\n';
    }
}
function clearCurrentStatusBar() {
    term.moveTo(1, exports.STATUS_BAR_HEIGHT + 1);
    term.eraseDisplayAbove();
    term.moveTo(1, 1);
}
function formatMoney(amount) {
    if (amount < 0) {
        return chalk.bold.red('-$' + Math.abs(amount).toString());
    }
    else {
        return chalk.bold.green('$' + amount.toString());
    }
}
function formatTransaction(transaction) {
    if (transaction == undefined) {
        return chalk.gray.italic('No transactions recorded');
    }
    var formatted = '';
    formatted += formatMoney(transaction.amount) + ' ';
    formatted += 'from ' + (transaction.location || chalk.gray.italic('fetching...'));
    return formatted;
}
