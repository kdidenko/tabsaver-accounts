"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor() {
        this.express = express();
    }
    mountRouts() {
        //TODO: @kdidenko - router must be extracted somewhere to controllers!
        const router = express.Router();
        //TODO: @kdidenko - routes dispatching below must be moved to controllers!
        router.get('/', (req, res) => {
            res.json({
                message: 'Accounts Service HOME route'
            });
        });
        //TODO: @kdidenko - base URL must be defined somewhere in config
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map