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
var fnx_1 = require("fnx");
var TransactionModel = (function (_super) {
    __extends(TransactionModel, _super);
    function TransactionModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = fnx_1.default.string;
        _this.created = fnx_1.default.complex.date;
        _this.amount = fnx_1.default.number;
        _this.location = fnx_1.default.string;
        return _this;
    }
    TransactionModel.prototype.setLocation = function (location) {
        this.location = location;
    };
    return TransactionModel;
}(fnx_1.default.Model));
__decorate([
    fnx_1.default.readonly
], TransactionModel.prototype, "id", void 0);
__decorate([
    fnx_1.default.readonly
], TransactionModel.prototype, "created", void 0);
__decorate([
    fnx_1.default.optional
], TransactionModel.prototype, "location", void 0);
__decorate([
    fnx_1.default.action
], TransactionModel.prototype, "setLocation", null);
exports.TransactionModel = TransactionModel;
