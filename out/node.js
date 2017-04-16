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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var express = require("express");
var uuid = require("uuid");
var http = require("http");
var createIO = require("socket.io");
var axios_1 = require("axios");
var bodyParser = require("body-parser");
var database_1 = require("./database");
var Node = (function () {
    //collaborators: Node[] = []
    function Node(name, endpoint, port) {
        var _this = this;
        this.name = name;
        this.endpoint = endpoint;
        this.port = port;
        this.id = uuid.v4();
        this.app = express();
        this.app.use(bodyParser.json());
        this.server = http.createServer(this.app);
        this.io = createIO(this.server);
        var socket;
        this.budget = "TEST-BUDGET";
        this.io.on('connection', function (s) {
            socket = s;
            socket.emit('node', _this.toJSON());
            socket.on('activate', function (id) {
                //register 
                console.log("ACTIVATED");
            });
            socket.on('deactivate', function (id) {
                //unregister
                console.log("DEACCTIVATED");
            });
        });
        this.app.get('/', function (req, res) {
            //res.sendFile(path.resolve('./index.html'));
            _this.joinBudget("NEW");
            res.end();
        });
        this.app.get('/sendBudget', function (req, res) {
            //update model with req.body.whatever
            _this.sendBudget();
        });
        this.app.post('/updateBudget', function (req, res) {
            //update model with req.body.whatever
            console.log("GOT IT");
            res.end();
        });
    }
    Node.prototype.joinBudget = function (budgetName) {
        database_1.joinBudget(budgetName, this.endpoint);
        this.budget = this.budget;
    };
    Node.prototype.getCollaborators = function () {
        return database_1.getCollaborators(this.budget);
    };
    Node.prototype.sendBudget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var collaborators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollaborators()];
                    case 1:
                        collaborators = _a.sent();
                        Object.keys(collaborators).forEach(function (key) {
                            console.log(collaborators[key].endpoint);
                            axios_1.default.post(collaborators[key].endpoint + '/updateBudget', { id: _this.id } //model
                            ).catch(function (error) {
                                console.log("ERROR:" + error);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Node.prototype.start = function () {
        this.server.listen(this.port);
    };
    Node.prototype.toJSON = function () {
        return {
            name: this.name
        };
    };
    return Node;
}());
exports.Node = Node;
