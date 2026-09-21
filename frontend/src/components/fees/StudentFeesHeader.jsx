// const StudentFeesHeader = ({ student }) => {
   
    const StudentFeesHeader = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-6">
      {/* Avatar */}
      <img
        src={ "/profilePic.webp"}
        alt="Student"
        className="w-20 h-20 rounded-full border"
      />

      {/* Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {/* {student.name} */}
          Ankit
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {/* {student.department} • Roll No: {student.roll} */}
          Information Technology
        </p>
      </div>
    </div>
  );
};

export default StudentFeesHeader;
