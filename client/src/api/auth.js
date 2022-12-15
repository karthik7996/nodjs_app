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

//changes for verification

export const verification = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/api/profile/verify", data, config);
  return response;
};

export const allVerifications = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get("/api/profile/verifications", config);
  return response;
};

export const acceptVerification = async (userId) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/profile/accept/verifications/${userId}`,
    config
  );
  return response;
};

export const deleteVerification = async (verificationId) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/profile/delete/verification/${verificationId}`,
    config
  );
  return response;
};
