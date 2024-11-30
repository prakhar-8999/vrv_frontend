import axios from "axios";
import {Event, Role, User} from "../types";

const API_URL = "https://vrv-backend.eveque.in";

const api = axios.create({
  baseURL: API_URL,
});

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.get<User[]>(
      `/users?email=${email}&password=${password}`
    );
    return response.data[0];
  },
};

export const userAPI = {
  getAll: async () => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },
  create: async (user: Omit<User, "id">) => {
    const response = await api.post<User>("/users", user);
    return response.data;
  },
  update: async (id: string, user: Partial<User>) => {
    const response = await api.patch<User>(`/users/${id}`, user);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },
};

export const eventAPI = {
  getAll: async () => {
    const response = await api.get<Event[]>("/events");
    return response.data;
  },
  create: async (event: Omit<Event, "id">) => {
    const response = await api.post<Event>("/events", event);
    return response.data;
  },
  update: async (id: string, event: Partial<Event>) => {
    const response = await api.patch<Event>(`/events/${id}`, event);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/events/${id}`);
  },
};

export const roleAPI = {
  getAll: async () => {
    const response = await api.get<Role[]>("/roles");
    return response.data;
  },
  update: async (id: string, role: Partial<Role>) => {
    const response = await api.patch<Role>(`/roles/${id}`, role);
    return response.data;
  },
};
