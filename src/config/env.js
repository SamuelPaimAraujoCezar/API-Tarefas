require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET não definido");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não definido");
}

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
