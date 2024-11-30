import {Edit, Plus, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {usePermissions} from "../hooks/usePermissions";
import {eventAPI} from "../services/api";
import {Event} from "../types";

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const {hasPermission} = usePermissions();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await eventAPI.getAll();
    setEvents(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await eventAPI.delete(id);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
        {hasPermission("create_event") && (
          <button
            onClick={() => navigate("/events/new")}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Event
          </button>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {event.description}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="mr-4">
                        📅 {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="mr-4">📍 {event.location}</span>
                      <span>👥 {event.capacity} attendees max</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {hasPermission("edit_event") && (
                      <button
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="p-2 text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    )}
                    {hasPermission("delete_event") && (
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
