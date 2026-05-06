import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/shared/ProtectedRoute'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import TeacherLayout from './layouts/TeacherLayout'
import StudentLayout from './layouts/StudentLayout'
import ScrollToTop from './components/shared/ScrollToTop'
import Home from './pages/public/Home'
import Courses from './pages/public/Courses'
import CourseDetail from './pages/public/CourseDetail'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import VerifyCertificate from './pages/public/VerifyCertificate'
import Registration from './pages/public/Registration'
import PublicBooks from './pages/public/Books'
import PrivacyPolicy from './pages/public/PrivacyPolicy'
import CookiesPolicy from './pages/public/CookiesPolicy'
import LoginSignup from './pages/auth/LoginSignup'
import NotFound from './pages/public/NotFound'
import Dashboard from './pages/admin/Dashboard'
import Students from './pages/admin/Students'
import Teachers from './pages/admin/Teachers'
import Books from './pages/admin/Books'
import AdminCourses from './pages/admin/Courses'
import Contacts from './pages/admin/Contacts'
import Admissions from './pages/admin/Admissions'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import QuizList from './pages/teacher/QuizList'
import CreateQuiz from './pages/teacher/CreateQuiz'
import EditQuiz from './pages/teacher/EditQuiz'
import QuizResults from './pages/teacher/QuizResults'
import StudentDashboard from './pages/student/StudentDashboard'
import AvailableQuizzes from './pages/student/AvailableQuizzes'
import AttemptQuiz from './pages/student/AttemptQuiz'
import Results from './pages/student/Results'
import ManageStudents from './pages/teacher/ManageStudents'
import StudentRecords from './pages/teacher/StudentRecords'

const App = () => (
  <>
    <Toaster position="top-center" reverseOrder={false} />
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="courses" element={<Courses />} />
      <Route path="courses/:id" element={<CourseDetail />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="verify" element={<VerifyCertificate />} />
      <Route path="registration" element={<Registration />} />
      <Route path="books" element={<PublicBooks />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="cookies-policy" element={<CookiesPolicy />} />
    </Route>

    <Route path="/login" element={<LoginSignup />} />

    <Route
      path="/admin"
      element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="students" element={<Students />} />
      <Route path="teachers" element={<Teachers />} />
      <Route path="books" element={<Books />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="admissions" element={<Admissions />} />
    </Route>

    <Route
      path="/teacher"
      element={<ProtectedRoute allowedRoles={['teacher']}><TeacherLayout /></ProtectedRoute>}
    >
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="quizzes" element={<QuizList />} />
      <Route path="quizzes/create" element={<CreateQuiz />} />
      <Route path="quizzes/:id/edit" element={<EditQuiz />} />
      <Route path="quizzes/:id/results" element={<QuizResults />} />
      <Route path="students" element={<ManageStudents />} />
      <Route path="student-records" element={<StudentRecords />} />
    </Route>

    <Route
      path="/student"
      element={<ProtectedRoute allowedRoles={['student']}><StudentLayout /></ProtectedRoute>}
    >
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="quizzes" element={<AvailableQuizzes />} />
      <Route path="quiz/:id" element={<AttemptQuiz />} />
      <Route path="results" element={<Results />} />
      <Route path="results/:attemptId" element={<Results />} />
    </Route>

    <Route path="*" element={<NotFound />} />
    </Routes>
  </>
)

export default App