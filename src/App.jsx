import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProblemListPage from './pages/ProblemListPage';
import ProblemPage from './pages/ProblemPage';
import McqPage from './pages/McqPage';
import ProgressPage from './pages/ProgressPage';

function ProblemRoute() {
  const { id } = useParams();
  return <ProblemPage key={id} />;
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '100vh' }}>
        <div className="loading__spinner" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProblemListPage />} />
        <Route path="/problem/:id" element={<ProblemRoute />} />
        <Route path="/mcq" element={<McqPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <>
      <AppRoutes />
      <Analytics />
    </>
  );
}
