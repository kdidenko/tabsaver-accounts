'use strict';

// nodejs imports
const config = require('config');
// typescript imports
import app from './App';

const port = config.get('app.port');

app.listen(port, (error) => {
    if (error) {
      return console.log(error);
    }

    return console.log(`Accounts Service is running on port ${port}`);
});
