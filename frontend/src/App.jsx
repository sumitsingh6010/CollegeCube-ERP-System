import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Faculty from "./pages/admin/Faculty";
import Student from "./pages/admin/Student";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendancePage from "./pages/faculty/AttendancePage";
import MarkAttendance from "./components/attendance/MarkAttendance";
import Layout from "./components/dashboard/Layout";
import ViewAttendancePage from "./components/attendance/ViewAttendStdntList";
import AttendanceDetail from "./components/attendance/AttendanceDetail";
import AttendanceProgress from "./components/attendance/AttendanceProgress";
import FeesPage from "./pages/student/FeesPage";
import AnnouncementList from "./components/announcement/AnnouncementList";
import MessengerPage from "./pages/common/MessengerPage";
import NotesListPage from "./components/notes/NotesListPage";
import NotesUnitsPage from "./components/notes/NotesUnitsPage";
import NotesSubjectsPage from "./components/notes/NotesSubjectsPage";
import EventsPage from "./pages/common/EventsPage";
import FeesDashboard from "./pages/admin/FeesDashboard";
import ApplicationsPage from "./pages/student/ApplicationsPage";
import InboxApplicationsPage from "./pages/common/InboxApplicationsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          {/* Admin*/}
          <Route path="/admin/attendance" element={<div>Attendance Page</div>} />
          <Route path="/admin/fees" element={<FeesDashboard />} />
          <Route path="/admin/notices" element={<div>Notices Page</div>} />
          <Route path="/admin/faculty" element={<Faculty />} />
          <Route path="/admin/student" element={<Student />} />
          <Route path="/admin/application" element={<InboxApplicationsPage />} />

         {/* faculty */}
         <Route path="/faculty/assignments" element={<div>Faculty Assignments</div>} />
          <Route path="/faculty/exams" element={<div>Faculty Exams</div>} />
          <Route path="/faculty/notifications" element={<div>Faculty Notifications</div>} />
          <Route path="/faculty/attendance" element={<AttendancePage />} />
          <Route path="/faculty/attendance/mark" element={<MarkAttendance />} />
          <Route path="/faculty/attendance/view" element={<ViewAttendancePage />}/> 
          <Route path="/faculty/attendance/student/:studentId"element={<AttendanceDetail role="FACULTY" />}/>
          <Route path="/faculty/notes" element={<NotesSubjectsPage />} />
          <Route path="/faculty/application" element={<InboxApplicationsPage />} />


         {/* students */}
          <Route path="/student/attendance" element={<AttendanceDetail />}/>
          <Route path="/student/fees" element={<FeesPage />} />
          <Route path="/student/exams" element={<div>Student Exams</div>} />
          <Route path="/student/notifications" element={<div>Student Notifications</div>} />
          <Route path="/student/notes" element={<NotesSubjectsPage />} />
          <Route path="/student/application" element={<ApplicationsPage />} />
           {/* common */}
          <Route path="/announcement" element={<AnnouncementList />} />
          <Route path="/messenger" element={<MessengerPage />} />
          <Route path="/notes/:subjectId" element={<NotesUnitsPage />} />
          <Route path="/notes/:subjectId/:unit" element={<NotesListPage />} />
          <Route path="/events" element={<EventsPage/>} />
        
        </Route>
        
         {/* Dashboards */}
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
         <Route path="/student/dashboard" element={<StudentDashboard />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
