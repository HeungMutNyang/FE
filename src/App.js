import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Pwd from "./pages/SetPassword";
// import Stamp from "./pages/Stamp";
// import Advice from "./pages/Advice";
import { DateProvider } from "./DateContext";

function App() {
  return (
    <DateProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/settings/password" element={<Pwd />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/advice" element={<Advice />} />
          <Route path="/stamp" element={<Stamp />} /> */}
        </Routes>
      </Router>
    </DateProvider>
  );
}

export default App;
