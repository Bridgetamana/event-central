import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import Loading from '../components/ui/Loading';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;