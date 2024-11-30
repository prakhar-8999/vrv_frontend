export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  category: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdBy: string;
  attendees: number[];
}

export type Permission =
  | "create_event"
  | "edit_event"
  | "delete_event"
  | "view_event"
  | "manage_users"
  | "manage_roles"
  | "approve_events"
  | "register_for_event"
  | "view_analytics";
