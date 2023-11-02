const { PaymentController } = require("../../http/controller/Api/payment.controller");
const { VerifyAccessToken } = require("../../http/middleware/VerifyAccessToken");

const router = require("express").Router();
router.post("/payment",PaymentController.PaymentGatway);
router.post("/verify",PaymentController)
module.exports={
    ApiPayment:router
}