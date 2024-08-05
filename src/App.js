import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Pwd from "./pages/SetPassword";
import Stamp from "./pages/Stamp";
import Diary from "./pages/Diary";
import Advice from "./pages/Advice";
import { DateProvider } from "./DateContext";
import AddSchedule from "./pages/AddSchedule";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/settings/password" element={<Pwd />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route
              path="/advice"
              element={<ProtectedRoute element={<Advice />} />}
            />
            <Route
              path="/stamp"
              element={<ProtectedRoute element={<Stamp />} />}
            />
            <Route
              path="/diary/:date"
              element={<ProtectedRoute element={<Diary />} />}
            />
            <Route
              path="/add-schedule"
              element={<ProtectedRoute element={<AddSchedule />} />}
            />
          </Routes>
        </Router>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;
