import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../stores/authStore';
import NotFound from '../pages/NotFound';

const RoleBasedRoute = ({ roles }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasRole = useAuthStore((state) => state.hasRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (roles && !hasRole(roles)) {
    return <NotFound />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;