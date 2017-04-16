"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppModel_1 = require("./models/AppModel");
exports.app = new AppModel_1.AppModel({
    view: AppModel_1.View.CHOOSE_NAME
});
