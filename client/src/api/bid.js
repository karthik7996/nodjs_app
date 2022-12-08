import axios from 'axios';
export const placeBid = async (id,data) => {
    const config = {
      withCredentials: true,
    }
    const response = await axios.put(`/api/bid/${id}`, data, config);
    return response;
}

export const getUserBid = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.get('/api/bid', config);
  return response;
}
