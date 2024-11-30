import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { Calendar, Users, Settings, BarChart } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { eventAPI, userAPI } from '../services/api';
import { Event, User } from '../types';

export const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { isAdmin, isManager } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [eventsData, usersData] = await Promise.all([
        eventAPI.getAll(),
        userAPI.getAll()
      ]);
      setEvents(eventsData);
      setUsers(usersData);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Events"
          value={events.length}
          icon={<Calendar className="h-6 w-6" />}
          onClick={() => navigate('/events')}
        />
        {(isAdmin() || isManager()) && (
          <DashboardCard
            title="Total Users"
            value={users.length}
            icon={<Users className="h-6 w-6" />}
            onClick={() => navigate('/users')}
          />
        )}
        {isAdmin() && (
          <DashboardCard
            title="Role Management"
            value="Manage"
            icon={<Settings className="h-6 w-6" />}
            onClick={() => navigate('/roles')}
          />
        )}
        {(isAdmin() || isManager()) && (
          <DashboardCard
            title="Analytics"
            value="View"
            icon={<BarChart className="h-6 w-6" />}
            onClick={() => navigate('/analytics')}
          />
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.slice(0, 5).map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/events/${event.id}`)}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};