const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async () => {
  const mongo = await MongoMemoryServer.create();

  global.__MONGO__ = mongo;
  process.env.MONGO_URI = mongo.getUri();
};
