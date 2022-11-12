import axios from 'axios';
import '../axios';


export const signup = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post('/api/auth/signup', data, config);
  return response
}

export const signin = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post('/api/auth/signin', data, config);
  return response
}
export const profileUpdate = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post('/api/profile', data, config);
  return response
}