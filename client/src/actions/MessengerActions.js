import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getConversations = createAsyncThunk(
    "messenger/getConversations",
    async () => {
        const res = await api.getConversations();
        const data = await res.data;
        return data.conversations;
    }
);
export const getMessages = createAsyncThunk(
    "messenger/getMessages",
    async (conversationId) => {
        const res = await api.getMessages(conversationId);
        const data = await res.data;
        return data.messages;
    }
);
export const sendMessage = createAsyncThunk(
    "messenger/sendMessage",
    async (message) => {
        const res = await api.sendMessage(message);
        const data = await res.data;
        return data.message;
    }
);
