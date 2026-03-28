const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} = require("../validations/authValidation");

const authController = require("../controllers/authController");

router.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);

router.post("/login", validate({ body: loginSchema }), authController.login);

router.post(
  "/refresh",
  validate({ body: refreshSchema }),
  authController.refresh,
);

router.post("/logout", validate({ body: logoutSchema }), authController.logout);

module.exports = router;
