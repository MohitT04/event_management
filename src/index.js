import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Screen/Login";
import Dashboard from "./Screen/Admin/Dashboard";
import FrmVenue from "./Screen/Admin/FrmVenue";
import FrmEquipment from "./Screen/Admin/FrmEquipment";
import FrmFood from "./Screen/Admin/FrmFood";
import FrmLight from "./Screen/Admin/FrmLight";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/Admin/dashboard" element={<Dashboard />} />
      <Route path="/Admin/dashboard/Venue" element={<FrmVenue />} />
      <Route path="/Admin/dashboard/Equipment" element={<FrmEquipment />} />
      <Route path="/Admin/dashboard/Food" element={<FrmFood />} />
      <Route path="/Admin/dashboard/Light" element={<FrmLight />} />
    </Routes>
  </BrowserRouter>
);
