const express = require("express");
const router = express.Router();
const { getAdminFeesDashboard } = require("../controllers/feesController");
const { auth } = require("../middlewares/auth");
// const { razorpayWebhook } = require("../controllers/webhookController");
const { isAdmin } = require("../middlewares/roleMiddleware");


// router.post(
//   "/razorpay",
//   express.raw({ type: "application/json" }),
//   razorpayWebhook
// );
// router.post("/create-order", auth, createOrder);
// router.post("/verify-payment", auth, verifyPayment);
router.get( "/admin-dashboard",auth,isAdmin,getAdminFeesDashboard);


module.exports = router;
