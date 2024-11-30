import {useAuthStore} from "../store/authStore";
import {Permission} from "../types";

export const usePermissions = () => {
  const {user, permissions} = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    console.log(permission);
    console.log(user);

    if (!user) return false;
    if (user.role === "admin") return true;

    return permissions?.includes(permission);
  };

  const isAdmin = (): boolean => user?.role === "admin";
  const isManager = (): boolean => user?.role === "manager";
  const isUser = (): boolean => user?.role === "user";

  return {
    hasPermission,
    isAdmin,
    isManager,
    isUser,
  };
};
