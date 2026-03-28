require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
};
