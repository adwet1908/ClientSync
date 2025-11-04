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
import NewLeadForm from "./components/Forms/NewLeadForm";
import NewProjectForm from "./components/Forms/NewProjectForm";
import NewClientForm from "./components/Forms/NewClientForm";
import NewInvoiceForm from "./components/Forms/NewInvoiceForm";
import ParentPage from "./pages/ParentPage";
import InvoiceDetails from "./pages/InvoiceDetails";
import ClientDetails from "./components/ClientDetails";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<ParentPage />} />
        <Route path="/register" element={<SignIn />} />

        {/* Protected Routes */}
        <Route element={<ProtectionRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/leads/new" element={<NewLeadForm/>} />
          <Route path="/projects/new" element={<NewProjectForm/>} />
          <Route path="/clients/new" element={<NewClientForm/>} />
          <Route path="/invoice/new" element={<NewInvoiceForm/>} />
          <Route path="/invoices/:id" element={<InvoiceDetails/>} />
          <Route path="/clients/:id" element={<ClientDetails />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
