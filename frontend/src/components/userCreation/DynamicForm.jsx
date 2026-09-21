const DynamicForm = ({ fields, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
