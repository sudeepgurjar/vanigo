import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import ConversationDetailPage from './pages/ConversationDetailPage';
import IntelligencePage from './pages/IntelligencePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/conversation/:id" element={<ConversationDetailPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;