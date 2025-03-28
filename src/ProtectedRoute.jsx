import { Navigate } from "react-router-dom";
import { useAuth } from "./routes/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;
  return user ? children : <Navigate to="/" />;
}
