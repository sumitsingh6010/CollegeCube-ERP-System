import { useState } from "react";
import PayFeesModal from "./PayFeesModel";

const PayFeesCard = ({ fees, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);

  const dueAmount = fees.totalAmount - fees.paidAmount;

  return (
    <>
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 w-full">
        <h3 className="text-lg font-semibold">Pay Fees</h3>

        <p className="mt-4 text-sm opacity-90">
          Outstanding Amount
        </p>

        <p className="text-3xl font-bold mt-1">
          ₹{dueAmount}
        </p>

        <button
          onClick={() => setShowModal(true)}   
          className="mt-8 w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Pay Now
        </button>

        <p className="text-xs opacity-75 mt-4">
          Secure payments powered by Razorpay
        </p>
      </div>

      {/* ✅ MODAL RENDERING */}
      {showModal && (
        <PayFeesModal
          due={dueAmount}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default PayFeesCard;
