import axios from "axios";

const config = {
  // baseURL: "http://localhost:5000/",
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
};

export const createChat = async (userId) => {
  const response = await axios.post("/api/chat/createchat", { userId }, config);
  return response;
};

export const allChats = async (loggedUserId) => {
  const response = await axios.get("/api/chat/allchat", config);
  return response;
};

export const sendMessage = async (content, chatId) => {
  const response = await axios.post(
    "/api/chat/sendmessage",
    { content, chatId },
    config
  );
  return response;
};

export const fetchAllMessage = async (chatId) => {
  const response = await axios.get(`/api/chat/allmessage/${chatId}`, config);
  return response;
};

//notification

export const createChatNotification = async (notification, userId) => {
  const response = await axios.post(
    "/api/chat/createchatnotification",
    {
      notification,
      userId,
    },
    config
  );
  return response;
};

export const getAllChatNotification = async () => {
  const response = await axios.get(
    "/api/chat/allchatnotification",

    config
  );
  return response;
};

export const deletechatnotification = async () => {
  const response = await axios.get("/api/chat/deletechatnotification", config);
  return response;
};