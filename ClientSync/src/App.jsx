import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RevenuePage from "./pages/Revenue";
import InvoicesPage from "./pages/Invoices";
import LeadsPage from "./pages/Leads";
import ProjectsPage from "./pages/Projects";
import ClientsPage from "./pages/Clients";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectionRoute from "./components/ProtectionRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/register" element={<SignIn />} />

        {/* Protected Routes */}
        <Route element={<ProtectionRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
