import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react"; // Import useState for managing loading state
import { useAuthContext } from "../redux/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in before accessing");
      setTimeout(() => {
        setLoading(false); // Set loading to false after 1 second
      }, 1000); // Wait for 1 second
    } else {
      setLoading(false); // Set loading to false immediately if user exists
    }
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
