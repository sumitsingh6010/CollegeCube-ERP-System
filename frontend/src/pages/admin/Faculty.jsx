import { useState } from "react";
import DepartmentList from "../../components/usersList/DepartmentList";
import EntityTable from "../../components/usersList/EntityTable";
import {
  fetchDepartments,
  fetchFacultyByDepartment,
} from "../../services/facultyService";


import { createFaculty } from "../../services/authService";

import CreateUserModal from "../../components/userCreation/CreateUserModel";
import { FACULTY_FIELDS } from "../../config/facultyCreationConfig";



const Faculty = () => {
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  
  const [showModal, setShowModal] = useState(false);

  const handleCreateFaculty = async (formData) => {
  try {
    await createFaculty({
      ...formData,
      departmentId: selectedDepartment._id,
    });

    setShowModal(false);
    setRefresh((prev) => !prev);
  } catch (error) {
    alert(error.response?.data?.message || "Failed to create faculty");
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Management</h1>

       
      </div>

      {/* existing layout */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <DepartmentList
            fetchDepartments={fetchDepartments}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedDepartment}
          />
        </div>

        <div className="col-span-9">
          {selectedDepartment && (
            <EntityTable
              title="Faculty"
              department={selectedDepartment}
              fetchData={fetchFacultyByDepartment}
              actionLabel="Faculty"
              onAddClick={() => setShowModal(true)}
              columns={[
                { key: "userId.name", label: "Name" },
                { key: "userId.email", label: "Email" },
              ]}
            />
          )}
        </div>
      </div>

      {/* ✅ Modal (independent of existing UI) */}
      {showModal && (
        <CreateUserModal
          title="Create Faculty"
          fields={FACULTY_FIELDS}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateFaculty}
        />
      )}
    </div>
  );
};

export default Faculty;
