import { User } from '../types';

export const checkPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  
  if (user.role === 'admin') return true;
  
  // Add more complex permission checks here
  return false;
};