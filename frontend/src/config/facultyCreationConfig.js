
const USER_COMMON_FIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];


export const FACULTY_FIELDS = [
     ...USER_COMMON_FIELDS,
  
  {
    name: "designation",
    label: "Designation",
    type: "text",
    required: true,
  },
];

export const STUDENT_FIELDS = [
     ...USER_COMMON_FIELDS,
  
  {
    name: "rollNumber",
    label: "Roll Number",
    type: "text",
    required: true,
  },
  {
    name: "semester",
    label: "Semester",
    type: "number",
    required: true,
  },
  {
    name: "admissionYear",
    label: "Admission Year",
    type: "number",
    required: true,
  },
];
