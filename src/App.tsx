import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";
import ComparisonPage from "@/pages/ComparisonPage";
import ProfilePage from "@/pages/ProfilePage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ReportsPage from "@/pages/ReportsPage";
import PatentsPage from "@/pages/PatentsPage";
import PatentDetailPage from "@/pages/PatentDetailPage";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录，实际项目中应从localStorage等获取

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/patents" element={<PatentsPage />} />
          <Route path="/patent/:id" element={<PatentDetailPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}
