import api from './api';

export const getClient = async (email, password) => {
  const requestBody = {
    email,
    password,
  };
  console.log('user', email);

  const result = await api.post('/login', requestBody);

  return result.data;
};
