import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import NotFound from "./routes/NotFound";
import "./index.css";
import Navbar from "./components/navbar";
import Contact from "../ContactForm";
import About from "../About";
import Footer from "./components/Footer";
import CaseList from "./components/CaseList";
import Chat from "../Chat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Navbar />

    <Routes>
      <Route path="/Chat" element={<Chat />} />
      <Route path="/" element={<Register />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/CaseList" element={<CaseList />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    
    </Routes>
  <Footer />  
  </BrowserRouter>
);
