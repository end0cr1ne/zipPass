const express = require("express");

const router = express.Router();
const controller = require("../controller");

router
  .route("/login")
  .get(controller.login)
  .post(controller.doLogin);

router
  .route("/signup")
  .get(controller.signup)
  .post(controller.doSignup);

router.get("/verifytoken", controller.verifySsoToken);

module.exports = router;
