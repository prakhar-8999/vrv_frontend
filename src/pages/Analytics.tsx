import { useState, useEffect } from 'react';
import { eventAPI, userAPI } from '../services/api';
import { Event, User } from '../types';
import { BarChart, Users, Calendar, TrendingUp } from 'lucide-react';

export const Analytics = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  const getEventsByStatus = () => {
    const statusCount = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0
    };
    events.forEach(event => {
      statusCount[event.status]++;
    });
    return statusCount;
  };

  const getUsersByRole = () => {
    const roleCount: Record<string, number> = {};
    users.forEach(user => {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });
    return roleCount;
  };

  const statusCount = getEventsByStatus();
  const roleCount = getUsersByRole();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Events
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {events.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {users.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Events by Status</h2>
          <div className="space-y-4">
            {Object.entries(statusCount).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24 capitalize">
                  {status}
                </span>
                <div className="flex-1 ml-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-600 rounded-full h-4"
                      style={{
                        width: `${(count / events.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Users by Role</h2>
          <div className="space-y-4">
            {Object.entries(roleCount).map(([role, count]) => (
              <div key={role} className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24 capitalize">
                  {role}
                </span>
                <div className="flex-1 ml-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-600 rounded-full h-4"
                      style={{
                        width: `${(count / users.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};