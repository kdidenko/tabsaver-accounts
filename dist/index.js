'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// nodejs imports
const config = require('config');
// typescript imports
const App_1 = require("./App");
const port = config.get('app.port');
App_1.default.listen(port, (error) => {
    if (error) {
        return console.log(error);
    }
    return console.log(`Accounts Service is running on port ${port}`);
});
//# sourceMappingURL=index.js.map
