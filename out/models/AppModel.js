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
var BudgetModel_1 = require("./BudgetModel");
var fnx_1 = require("fnx");
var View;
(function (View) {
    View[View["CHOOSE_NAME"] = 0] = "CHOOSE_NAME";
    View[View["JOIN_OR_CREATE_SELECTION"] = 1] = "JOIN_OR_CREATE_SELECTION";
    View[View["JOIN_BUDGET"] = 2] = "JOIN_BUDGET";
    View[View["CREATE_BUDGET"] = 3] = "CREATE_BUDGET";
    View[View["WITHDRAW_OR_DEPOSIT_SELECTION"] = 4] = "WITHDRAW_OR_DEPOSIT_SELECTION";
    View[View["WITHDRAW"] = 5] = "WITHDRAW";
    View[View["DEPOSIT"] = 6] = "DEPOSIT";
})(View = exports.View || (exports.View = {}));
var AppModel = (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.budget = fnx_1.default.object(BudgetModel_1.BudgetModel);
        _this.userName = fnx_1.default.string;
        _this.view = fnx_1.default.number;
        return _this;
    }
    AppModel.prototype.setView = function (view) {
        this.view = view;
    };
    AppModel.prototype.transaction = function (fn) {
        fn();
    };
    AppModel.prototype.setUserName = function (name) {
        this.userName = name;
    };
    AppModel.prototype.createBudget = function (name) {
        this.budget = {
            budgetName: name,
            transactions: {}
        };
    };
    return AppModel;
}(fnx_1.default.Model));
__decorate([
    fnx_1.default.optional
], AppModel.prototype, "budget", void 0);
__decorate([
    fnx_1.default.optional
], AppModel.prototype, "userName", void 0);
__decorate([
    fnx_1.default.action
], AppModel.prototype, "setView", null);
__decorate([
    fnx_1.default.action
], AppModel.prototype, "transaction", null);
__decorate([
    fnx_1.default.action
], AppModel.prototype, "setUserName", null);
__decorate([
    fnx_1.default.action
], AppModel.prototype, "createBudget", null);
exports.AppModel = AppModel;
