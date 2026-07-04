import axiosInstance from '../api/axiosInstance';

// Error handler
const handleError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
    throw new Error(error.response.data.message || 'API Error');
  } else if (error.request) {
    console.error('No response from server:', error.request);
    throw new Error('No response from server');
  } else {
    console.error('Error:', error.message);
    throw error;
  }
};

const EmployeeService = {

  // GET all employees
  getEmployees: async () => {
    try {
      const response = await axiosInstance.get('/v1/employee');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // GET employee by ID
  getEmployee: async (id) => {
    try {
      const response = await axiosInstance.get(`/v1/employee/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // CREATE employee
  createEmployee: async (employeeData) => {
    try {
      const response = await axiosInstance.post('/v1/employee', employeeData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

updateEmployee: async (employeeData) => {
  const response = await axiosInstance.put(
    '/v1/employee',
    employeeData
  );

  return response.data;
},

  // DELETE employee
  deleteEmployee: async (id) => {
    try {
      const response = await axiosInstance.delete(`/v1/employee/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // SEARCH employee
  searchEmployees: async (keyword) => {
    try {
      const response = await axiosInstance.get(
        '/v1/employee/search',
        {
          params: {
            keyword: keyword,
          },
        }
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // PAGINATION
  getEmployeesByPage: async (page = 0, size = 5) => {
    try {
      const response = await axiosInstance.get(
        '/v1/employee/page',
        {
          params: {
            page: page,
            size: size,
          },
        }
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default EmployeeService;