import { useState } from "react";
import {
  createFeesOrder,
  verifyFeesPayment,
} from "../../services/feesService";

const PayFeesModal = ({ due, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!amount || amount <= 0 || amount > due) {
      alert("Invalid amount");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Razorpay order
      const res = await createFeesOrder(Number(amount));
      const { order, feesId } = res.data;

      // 2️⃣ Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "College Cube",
        description: "Fees Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            console.log("📌 Payment success, verifying...");

            await verifyFeesPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              feesId,
              notes: {
              feesId: feesId,
              },

              amount: Number(amount),
            });

            alert("Payment successful 🎉");
            onSuccess(); // refresh fees data
            onClose();
          } catch (err) {
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      // 3️⃣ Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("❌ Payment failed", err);
      alert("Unable to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Pay Fees</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter amount"
        />

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handlePay}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayFeesModal;
