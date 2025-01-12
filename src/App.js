import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserDashboard from './dashboards/UserDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/user-dashboard" element={<UserDashboard />} />
    <Route path="/staff-dashboard" element={<StaffDashboard />} />
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
  </Routes>
</Router>

  );
}

export default App;
