import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import RegisterFreelancer from "../pages/RegisterFreelancer";
import RegisterCompany from "../pages/RegisterCompany";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Messages from "../pages/Messages";
import Chat from "../pages/Chat";
import Applications from "../pages/Applications";
import JobDetails from "../pages/JobDetails";
import DrawerMenu from "../pages/DrawerMenu";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register/freelancer" element={<RegisterFreelancer />} />
        <Route path="/register/company" element={<RegisterCompany />} />

        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat/:id?" element={<Chat />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}