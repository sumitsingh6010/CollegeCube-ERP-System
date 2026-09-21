const crypto = require("crypto");
const Fees = require("../models/Fees");

/* ================= RAZORPAY WEBHOOK ================= */
exports.razorpayWebhook = async (req, res) => {
  try {
    console.log("📌 Razorpay webhook received");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      console.log("❌ Invalid webhook signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body.event;

    // ✅ We only care about successful payments
    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;

      const { id, amount, order_id, notes } = payment;

      console.log("✅ Payment captured via webhook:", id);

      // ⚠️ feesId must be passed via notes (important)
      const feesId = notes?.feesId;
      if (!feesId) {
        console.log("⚠️ feesId missing in webhook notes");
        return res.status(200).json({ message: "No feesId" });
      }

      const fees = await Fees.findById(feesId);
      if (!fees) return res.status(404).json({ message: "Fees not found" });

      // 🔒 Idempotency check
      const alreadyPaid = fees.payments.some(
        (p) => p.razorpay_payment_id === id
      );

      if (alreadyPaid) {
        console.log("ℹ️ Payment already recorded");
        return res.status(200).json({ message: "Already processed" });
      }

      const paidAmount = amount / 100;

      fees.paidAmount += paidAmount;
      fees.payments.push({
        razorpay_payment_id: id,
        amount: paidAmount,
      });

      fees.status =
        fees.paidAmount >= fees.totalAmount ? "PAID" : "PARTIAL";

      await fees.save();

      console.log("✅ Fees updated via webhook");
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error", error);
    res.status(500).json({ message: "Webhook failed" });
  }
};
