const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/env");

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 MongoDB conectado");
  } catch (error) {
    console.error("🔴 Erro ao conectar no banco:", error);
  }
}

module.exports = connectDB;
