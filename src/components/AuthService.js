import axios from 'axios';


class AuthService {
 

  login(email, password) {
    return axios
      .post('https://azuretravel.onrender.com/api/v1/auth/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Save the userId in localStorage
        return response.data.userId;
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  }

  register(fName, lName, email, nationality, password) {
    return axios
      .post('https://azuretravel.onrender.com/api/v1/auth/register', { fName, lName, email, nationality, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Save the userId in localStorage
        return response.data.userId;
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  }



  
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  
    isAuthenticated() {
      // Check if the token is present in localStorage
      return localStorage.getItem('token') !== null;
    }
  }
export default new AuthService();