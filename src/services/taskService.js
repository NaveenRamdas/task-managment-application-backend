import axios from 'axios';

const API_URL = 'http://localhost:3000';

const taskService = {
  register: async (username, password) => {
    try {
      const response = await axios.post(API_URL + '/auth/register', { username, password });
      return response.data.token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  login: async (username, password) => {
    try {
      const response = await axios.post(API_URL + '/auth/login', { username, password });
      return response.data.token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllTasks: async (token) => {
    try {
      const response = await axios.get(API_URL + '/tasks/getAllTasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createTask: async (token, task) => {
    try {
      const response = await axios.post(API_URL + '/tasks/createTask', task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateTask: async (token, id, task) => {
    try {
      const response = await axios.put(API_URL + `/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteTask: async (token, id) => {
    try {
      await axios.delete(API_URL + `/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default taskService;
