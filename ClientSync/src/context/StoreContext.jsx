import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [clientDetails, setClientDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserStatus();
    console.log("user success");
  }, []);

  // Fetching Data
  const fetchClients = async () => {
    try {
      const response = await api.get("/client/all"); // api path

      if (response.data.success) {
        setClients(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientDetails = async (id) => {
      try {
        const response = await api.get(`/client/${id}`);
        if (response.data.success) {
          setClientDetails(response.data.client);
        } else {
          toast.error("Unable to fetch client details");
        }
      } catch (error) {
        console.log("Error fetching client:", error);
        toast.error("Error fetching client details");
      }
  };

  const fetchUserStatus = async () => {
    try {
      const response = await api.get("/auth/get-user"); //
      if (response.data.success) {
        // console.log("User success");
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await api.get("/lead/all");
      if (response.data.success) {
        setLeads(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch leads");
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("/project/all");

      if (response.data.success) {
        setAllProjects(response.data.message);
      } else {
        toast.error("Cannot fetch projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await api.get("/invoice/all");
      if (response.data.success) {
        setInvoices(response.data.message);
        setTimeout(() => {
          console.log("Invoices here", invoices);
        },2000)
      } else {
        toast.error("Cannot fetch Invoices");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Details
  const fetchInvoiceDetails = async (id) => {
    try {
      const res = await api.get(`/invoice/${id}`); // use api not axios
      if (res.data.success) {
        setInvoiceDetails(res.data.invoice); // ensure consistent naming
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching invoice:", err);
    }
  };

  // Deletion

  const deleteInvoice = async (id) => {
    try {
      const res = await api.delete(`/invoice/${id}`);
      if(res.data.message){
        toast.success("Invoice deleted succesfully")
      } 
    } catch (error) {
      toast.error(res.data.message)
    }
  }

  const clientDelete = async (id) => {
    try {
      const res = await api.delete(`/client/${id}`); 
      if(res.data.success){
        toast.success(res.data.message); 
      } 
    } catch (error) {
      toast.error(res.data.message)
    }
  }

  // Handling authentication
  const handleLogout = async () => {
    const response = await api.post("/auth/admin-logout");
    if (response.data.success) {
      setUser(null);
      toast.success(response.data.message);
      navigate("/register");
    } else {
      toast.error(response.data.message);
    }
  };

  // Updation code
  const updateClient = async () => {};

  const contextValue = {
    user,
    setUser,
    loading,
    clients,
    fetchClients,
    invoices,
    fetchInvoices,
    revenue,
    allProjects,
    fetchProjects,
    leads,
    fetchLeads,
    handleLogout,
    invoiceDetails,
    fetchInvoiceDetails,
    deleteInvoice, 
    clientDetails, 
    fetchClientDetails, 
    clientDelete
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
