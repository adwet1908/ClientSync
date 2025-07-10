import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api.js";
import { toast } from "react-toastify";
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

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserStatus();
    console.log("user success");
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get("/client/all");
      
      if(response.data.success){
        setClients(response.data.message); 
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserStatus = async () => {
    try {
      const response = await api.get("/auth/get-user");
      if (response.data.success) {
        // console.log("User success");
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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

      if(response.data.success){
        setAllProjects(response.data.message); 
      }
      else{
        toast.error("Cannot fetch projects")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await api.get("/invoice/all")
      if(response.data.success){
        setInvoices(response.data.message); 
      }
      else{
        toast.error("Cannot fetch Invoices")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const contextValue = {
    user,
    setUser,
    loading,
    clients,
    fetchClients,
    invoices, fetchInvoices, 
    revenue,
    allProjects,
    fetchProjects,
    leads,
    fetchLeads,
    handleLogout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
