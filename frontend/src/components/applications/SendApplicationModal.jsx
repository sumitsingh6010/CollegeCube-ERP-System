import { useState } from "react";
import { sendApplication } from "../../services/applicationService";

const SendApplicationModal = ({ close, refresh }) => {

  const [form, setForm] = useState({
    receiverRole: "ADMIN",
    category: "Leave",
    subject: "",
    message: "",
  });

 const handleSubmit = async () => {

  try {

    const res = await sendApplication(form);

    console.log("Application response:", res.data);

    refresh();
    close();

  } catch (error) {

    console.error("Send Application Error:", error.response?.data);

    alert(error.response?.data?.message || "Failed to send application");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-lg font-semibold mb-4">
          Send Application
        </h2>

        <label className="text-sm">To</label>

        <select
          className="w-full border p-2 rounded mb-3"
          onChange={(e) =>
            setForm({ ...form, receiverRole: e.target.value })
          }
        >
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
        </select>

        <label className="text-sm">Category</label>

        <select
          className="w-full border p-2 rounded mb-3"
          value={form.category}
          onChange={(e) =>
          setForm({ ...form, category: e.target.value })
          }
        >
         {/* <option value="">Select subject</option> */}
         <option value="">Select category </option>
         <option value="Leave">Leave</option>
         <option value="Scholarship">Scholarship</option>
         <option value="Fee Extension">Fees</option>
         <option value="Other">Bonafied</option>
         <option value="Other">other</option>
         </select>

        
         <label className="text-sm">Subject</label>

        <textarea
          rows="4"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />


        <label className="text-sm">Message</label>

        <textarea
          rows="4"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={close}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default SendApplicationModal;