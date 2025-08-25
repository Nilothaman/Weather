import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetail from "./pages/CityDetail";
import AuthButton from "./components/AuthButton";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="content-container"><p>Loading…</p></div>;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-header">🌤️ Weather App</div>
      <AuthButton />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/city/:id"
          element={
            <PrivateRoute>
              <CityDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
