export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateEventCapacity = (capacity: number): boolean => {
  return capacity > 0 && Number.isInteger(capacity);
};

export const validateEventDate = (date: string): boolean => {
  const eventDate = new Date(date);
  return eventDate > new Date();
};