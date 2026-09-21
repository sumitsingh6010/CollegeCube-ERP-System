import api from "./api";

export const fetchMessengerUsers = () =>
  api.get("/messenger/users");

export const fetchGroupMessages = () =>
  api.get("/messenger/group");

export const sendGroupMessage = (data) =>
  api.post("/messenger/group/send", data);

export const fetchPrivateMessages = (receiverId) =>
  api.get(`/messenger/private/${receiverId}`);

export const sendPrivateMessage = (data) =>
  api.post("/messenger/private/send", data);

export const deleteMessage = (messageId) =>
  api.delete(`/messenger/delete/${messageId}`);
