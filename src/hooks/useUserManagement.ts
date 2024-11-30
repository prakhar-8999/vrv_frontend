import { useState } from 'react';
import { User } from '../types';
import { userAPI } from '../services/api';
import { useToast } from './useToast';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      showError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await userAPI.create(user);
      setUsers([...users, newUser]);
      showSuccess('User created successfully');
      return newUser;
    } catch (error) {
      showError('Failed to create user');
      throw error;
    }
  };

  const updateUser = async (id: number, user: Partial<User>) => {
    try {
      const updatedUser = await userAPI.update(id, user);
      setUsers(users.map(u => u.id === id ? updatedUser : u));
      showSuccess('User updated successfully');
      return updatedUser;
    } catch (error) {
      showError('Failed to update user');
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userAPI.delete(id);
      setUsers(users.filter(u => u.id !== id));
      showSuccess('User deleted successfully');
    } catch (error) {
      showError('Failed to delete user');
      throw error;
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};