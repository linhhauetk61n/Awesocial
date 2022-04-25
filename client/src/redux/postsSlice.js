import { createSlice } from "@reduxjs/toolkit";
import {
    getTimeline,
    getAllPosts,
    likePost,
    deletePost,
    addPost,
} from "../actions/PostActions";

const INITIAL_STATE = {
    posts: [],
    isFetching: false,
};
export const postsSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    reducers: {
        sortPost: (state) => {
            state.posts.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            });
        },
        logout: (state) => {
            state.posts = [];
            state.isFetching = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTimeline.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(getTimeline.fulfilled, (state, action) => {
                state.posts = [...action.payload];
                state.posts.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                });
                state.isFetching = false;
            })
            .addCase(getTimeline.rejected, (state, action) => {
                state.isFetching = false;
            })
            .addCase(getAllPosts.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts = [...action.payload];
                state.isFetching = false;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isFetching = false;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload
                );
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.posts = state.posts.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                });
            });
    },
});
