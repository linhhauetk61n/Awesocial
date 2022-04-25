import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk("user/login", async (formData) => {
    const res = await api.login(formData);
    const data = await res.data;
    return data.user;
});
export const register = createAsyncThunk("user/register", async (formData) => {
    const res = await api.register(formData);
    const data = await res.data;

    return data.user;
});
export const checkLogin = createAsyncThunk(
    "user/checkLoginByToken",
    async () => {
        const res = await api.checkLoginByToken();
        const data = await res.data;
        return data.user;
    }
);
export const getFriends = createAsyncThunk(
    "user/getFriends",
    async (userId) => {
        const res = await api.getFriends(userId);
        const data = await res.data;
        return data.friends;
    }
);
export const getPeople = createAsyncThunk("user/getPeople", async () => {
    const res = await api.getPeople();
    const data = await res.data;
    return data.users;
});
export const followUser = createAsyncThunk(
    "user/followUser",
    async (userId) => {
        const res = await api.followUser(userId);
        const data = await res.data;
        return { user: data.user, currentUser: data.currentUser };
    }
);
export const unfollowUser = createAsyncThunk(
    "user/unfollowUser",
    async (userId) => {
        const res = await api.unfollowUser(userId);
        const data = await res.data;
        return { user: data.user, currentUser: data.currentUser };
    }
);
export const updateCurrentUser = createAsyncThunk(
    "user/updateCurrentUser",
    async (profileUpdate) => {
        const res = await api.updateUser(profileUpdate);
        const data = await res.data;
        return data.user;
    }
);
