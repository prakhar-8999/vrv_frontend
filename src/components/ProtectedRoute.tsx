import {Navigate} from "react-router-dom";
import {usePermissions} from "../hooks/usePermissions";
import {useAuthStore} from "../store/authStore";
import {Permission} from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
}

export const ProtectedRoute = ({
  children,
  requiredPermission,
}: ProtectedRouteProps) => {
  const {isAuthenticated} = useAuthStore();
  const {hasPermission} = usePermissions();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};
