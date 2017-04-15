"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionModel_1 = require("./TransactionModel");
var fnx_1 = require("fnx");
var uuid = require("uuid");
var AppModel = (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.transactions = fnx_1.default.mapOf(fnx_1.default.object(TransactionModel_1.TransactionModel));
        return _this;
    }
    AppModel.prototype.getTotal = function () {
        var _this = this;
        var total = 0;
        Object.keys(this.transactions).forEach(function (id) {
            total += _this.transactions[id].amount;
        });
        return total;
    };
    AppModel.prototype.getTransactionsOrderedByDateCreated = function () {
        var _this = this;
        return Object.keys(this.transactions).map(function (id) { return _this.transactions[id]; }).sort(function (t1, t2) {
            return t1.created.valueOf() > t2.created.valueOf() ? 1 : -1;
        });
    };
    AppModel.prototype.getMostRecentTransaction = function () {
        return this.getTransactionsOrderedByDateCreated()[0];
    };
    AppModel.prototype.createTransaction = function (amount) {
        var id = uuid.v4();
        this.transactions[id] = {
            amount: amount, id: id, created: new Date()
        };
        return id;
    };
    return AppModel;
}(fnx_1.default.Model));
__decorate([
    fnx_1.default.computed
], AppModel.prototype, "getTotal", null);
__decorate([
    fnx_1.default.computed
], AppModel.prototype, "getTransactionsOrderedByDateCreated", null);
__decorate([
    fnx_1.default.computed
], AppModel.prototype, "getMostRecentTransaction", null);
__decorate([
    fnx_1.default.action
], AppModel.prototype, "createTransaction", null);
exports.AppModel = AppModel;