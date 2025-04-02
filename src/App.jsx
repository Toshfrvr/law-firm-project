import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import { AuthProvider } from "./routes/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactForm";
import About from "./components/About";
import Footer from "./components/Footer";
import CaseList from "./components/CaseList";
// import CaseManagement from "./components/caseManagement";
import Chat from "./components/Chat";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-list" element={<CaseList/>} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
