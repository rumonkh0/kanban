import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../stores/authStore';

const Unauthorized = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>403 Forbidden</h2>
        <p>You do not have permission to view this page.</p>
    </div>
);

const RoleBasedRoute = ({ roles }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasRole = useAuthStore((state) => state.hasRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (roles && !hasRole(roles)) {
    return <Unauthorized />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;