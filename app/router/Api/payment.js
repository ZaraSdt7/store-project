const { PaymentController } = require("../../http/controller/Api/payment.controller");
const { VerifyAccessToken } = require("../../http/middleware/VerifyAccessToken");

const router = require("express").Router();
router.post("/payment",VerifyAccessToken,PaymentController.PaymentGatway);
router.post("/verify")
module.exports={
    ApiPayment:router
}