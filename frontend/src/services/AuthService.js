import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const parseJwt = (token) => {

  const payload = JSON.parse(atob(token.split('.')[1]));

  return {
    username: payload.sub,
    roles: payload.roles
  };

};

const AuthService = {

  login: async (username, password) => {

    try {

      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          username,
          password
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);

      const user = parseJwt(token);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      return user;

    } catch (err) {

      throw new Error(
        err?.response?.data?.message ||
        "Invalid username or password"
      );

    }

  },

  logout: () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  },

  getStoredUser: () => {

    try {

      const raw = localStorage.getItem("user");

      return raw ? JSON.parse(raw) : null;

    } catch {

      return null;

    }

  }

};

export default AuthService;