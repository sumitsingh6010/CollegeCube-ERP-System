import { useState } from "react";
import DynamicForm from "./DynamicForm";

const CreateUserModal = ({
  title,
  fields,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});

 const handleSubmit = async (e) => {
  e.preventDefault();
  await onSubmit(formData);
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit}>
          <DynamicForm
            fields={fields}
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
