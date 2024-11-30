import { useState } from 'react';
import { Event } from '../types';
import { eventAPI } from '../services/api';
import { useToast } from './useToast';

export const useEventManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventAPI.getAll();
      setEvents(data);
    } catch (error) {
      showError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const newEvent = await eventAPI.create(event);
      setEvents([...events, newEvent]);
      showSuccess('Event created successfully');
      return newEvent;
    } catch (error) {
      showError('Failed to create event');
      throw error;
    }
  };

  const updateEvent = async (id: number, event: Partial<Event>) => {
    try {
      const updatedEvent = await eventAPI.update(id, event);
      setEvents(events.map(e => e.id === id ? updatedEvent : e));
      showSuccess('Event updated successfully');
      return updatedEvent;
    } catch (error) {
      showError('Failed to update event');
      throw error;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await eventAPI.delete(id);
      setEvents(events.filter(e => e.id !== id));
      showSuccess('Event deleted successfully');
    } catch (error) {
      showError('Failed to delete event');
      throw error;
    }
  };

  return {
    events,
    loading,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};