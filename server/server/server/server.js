"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var hbs_1 = __importDefault(require("hbs"));
var config_json_1 = __importDefault(require("../config.json"));
var AppServer = (function () {
    function AppServer() {
        this.app = null;
        this.server = null;
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.app.set('view engine', 'hbs');
        this.app.set('views', path_1.default.normalize(path_1.default.join(__dirname, '..', '..', 'views')));
        hbs_1.default.registerPartials(path_1.default.normalize(path_1.default.join(__dirname, '..', '..', 'views', 'partials')));
        this.app.use('/static', express_1.default.static(path_1.default.normalize(path_1.default.join(__dirname, '..', '..', 'public'))));
    }
    AppServer.prototype.run = function () {
        if (this.app === null)
            return;
        if (this.server === null)
            return;
        this.route();
        this.server.listen(config_json_1.default.port, function () { console.log("\u0421\u043B\u0443\u0448\u0430\u044E \u043F\u043E\u0440\u0442 ".concat(config_json_1.default.port)); });
    };
    AppServer.prototype.route = function () {
        this.app.get("/", function (req, res) {
            res.render('index.hbs', { title: "Система визуализации СДС" });
        });
        this.app.post("/", function (req, res) {
            res.send('HELLO POST');
        });
    };
    return AppServer;
}());
var app = new AppServer();
app.run();
//# sourceMappingURL=server.js.map