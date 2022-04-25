import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL: base_url });
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};

//USER
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);
export const checkLoginByToken = () => API.get("/auth");
export const getFriends = (userId) => API.get(`/users/friends/${userId}`);
export const getPeople = () => API.get("/users/all");
export const getUser = (userId) => API.get(`/users?userId=${userId}`);
export const followUser = (userId) => API.put(`/users/${userId}/follow`);
export const unfollowUser = (userId) => API.put(`/users/${userId}/unfollow`);
export const updateUser = (profileUpdate) => API.put("/users", profileUpdate);
//SEARCH
export const searchByQuery = (searchQuery) =>
    API.get(`users/find?searchQuery=${searchQuery}`);
//POSTS
export const getTimeline = () => API.get("/posts/timeline/all");
export const getAllPosts = (userId) => API.get(`/posts/profile/${userId}`);
export const likePost = (postId) => API.put(`/posts/${postId}/like`);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const addPost = (post) => API.post("/posts", post);
export const getComments = (postId) => API.get(`/posts/comments/${postId}`);
export const postComment = (cmt) => API.post("/posts/comments", cmt);
export const deleteComment = (cmtId) => API.delete(`/posts/comments/${cmtId}`);
//UPLOAD IMAGE
export const uploadFile = (fileData) => API.post("/upload", fileData);
//MESSENGER
export const getConversations = () => API.get("/conversations");
export const getMessages = (conversationId) =>
    API.get(`/messages/${conversationId}`);
export const sendMessages = (message) => API.post("/messages", message);
export const getConversation = (firstUserId, secondUserId) =>
    API.get(`/conversations/find/${firstUserId}/${secondUserId}`);
export const createConversation = (data) => API.post("/conversations", data);
export const sendMessage = (message) => API.post("/messages", message);
