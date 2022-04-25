import { createSlice } from "@reduxjs/toolkit";
import {
    getConversations,
    getMessages,
    sendMessage,
} from "../actions/MessengerActions";

const INITIAL_STATE = {
    messages: [],
    conversations: [],
};
export const messengerSlice = createSlice({
    name: "messenger",
    initialState: INITIAL_STATE,
    reducers: {
        sendMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        createConversation: (state, action) => {
            state.conversations = [action.payload, ...state.conversations];
        },
        logout: (state) => {
            state.messages = [];
            state.conversations = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                const Conversations = action.payload.sort((p1, p2) => {
                    return new Date(p2.updatedAt) - new Date(p1.updatedAt);
                });
                state.conversations = [...Conversations];
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = [...action.payload];
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages = [...state.messages, action.payload];
            });
    },
});
