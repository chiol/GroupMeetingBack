const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(_=> {
  console.log('Sync database!');
  if (process.env.NODE_ENV == 'test') {
    app.listen(3002, () => {
      console.log('TEST Server is running on 3000 port');
    });
  }
  else {
    app.listen(3000, () => {
      console.log('Server is running on 3000 port');
    });
  }
})