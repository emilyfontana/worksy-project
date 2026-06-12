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
import Profile from "../pages/Profile";
import FavoriteJobs from "../pages/FavoriteJobs";
import Payments from "../pages/Payments";
import Employees from "../pages/Employees";

// Telas estruturadas da Empresa
import CompanyHome from "../pages/company/CompanyHome";
import MyJobs from "../pages/company/MyJobs";
import JobApplicants from "../pages/company/JobApplicants";
import CreateJob from "../pages/company/CreateJob";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Autenticação */}
        <Route path="/" element={<Login />} />
        <Route path="/register/freelancer" element={<RegisterFreelancer />} />
        <Route path="/register/company" element={<RegisterCompany />} />

        {/* Rotas do Freelancer (Candidato) */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat/:id?" element={<Chat />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoriteJobs />} />

        {/* Rotas de Administração / Extras */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/employees" element={<Employees />} />
        
        {/* Rotas da Empresa (Recrutador) */}
        <Route path="/company" element={<CompanyHome />} />
        <Route path="/company/my-jobs" element={<MyJobs />} />
        <Route path="/company/applicants/:id" element={<JobApplicants />} />
        <Route path="/company/create-job" element={<CreateJob />} />

        {/* Redirecionamento padrão para rotas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}