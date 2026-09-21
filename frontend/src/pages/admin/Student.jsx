import { useState } from "react";
import DepartmentList from "../../components/usersList/DepartmentList";
import EntityTable from "../../components/usersList/EntityTable";
import {
  fetchStudentDepartments,
  fetchStudentsByDepartment,
} from "../../services/studentService";

import { createStudent } from "../../services/authService";

import CreateUserModal from "../../components/userCreation/CreateUserModel";
import { STUDENT_FIELDS } from "../../config/facultyCreationConfig";

const Student = () => {
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  
  const [showModal, setShowModal] = useState(false);

 const handleCreateStudent = async (formData) => {
    try {
      await createStudent({
        ...formData,
         departmentId: selectedDepartment._id,
        courseId: formData.courseId, 
      });

      setShowModal(false);
      setRefresh(!refresh);
    } catch (error) {
      alert(error.response?.data?.message || "new student is added");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>

        {/* ✅ Add Student button */}
       
      </div>

      {/* existing layout */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <DepartmentList
            fetchDepartments={fetchStudentDepartments}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedDepartment}
          />
        </div>

        <div className="col-span-9">
          {selectedDepartment && (
            <EntityTable
              title="Students"
              department={selectedDepartment}
              fetchData={fetchStudentsByDepartment}
               onAddClick={() => setShowModal(true)}
              actionLabel="Student"
              columns={[
                // { key: "name", label: "Name" },
                 { key: "userId.name", label: "Name" },
               
                { key: "rollNumber", label: "Roll No" },
                { key: "semester", label: "Semester" },
                // { key: "email", label: "Email" },
                 { key: "userId.email", label: "Email" },
              ]}
            />
          )}
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <CreateUserModal
          title="Create Student"
          fields={STUDENT_FIELDS}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateStudent}
        />
      )}
    </div>
  );
};

export default Student;
