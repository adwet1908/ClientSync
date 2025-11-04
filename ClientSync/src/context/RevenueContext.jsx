// functions in the revenue context page

// Total Revenue of the user since last twelve months 
// Revenue this month
// Average revenue per client
// Monthly Revenue Add / Drop percentage
// Revenue graph for that particular year 
// Pending Invoices 
// Recently paid invoices in past 3 days / Past 3 invoices paid

import { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const RevenueContext = createContext(null); 