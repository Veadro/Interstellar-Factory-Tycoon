// db.js

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/interstellar-factory-tycoon';

module.exports = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    //store url in db object
    //client.db.s.client.options.url = MONGODB_URI;
    console.log ('hello?'  + client.db.s.url);
    return client.db();
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err}`);
    process.exit(1);
  }
};
