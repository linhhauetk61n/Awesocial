import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getTimeline = createAsyncThunk("posts/getTimeline", async () => {
    const res = await api.getTimeline();
    const data = await res.data;
    return data.posts;
});
export const getAllPosts = createAsyncThunk(
    "posts/getAllPostsById",
    async (userId) => {
        const res = await api.getAllPosts(userId);
        const data = await res.data;
        return data.posts;
    }
);
export const likePost = createAsyncThunk("posts/likePost", async (postId) => {
    const res = await api.likePost(postId);
    const data = await res.data;
    return data.post;
});

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId) => {
        await api.deletePost(postId);
        return postId;
    }
);
export const uploadFile = async (fileData) => {
    const res = await api.uploadFile(fileData);
    const status = await res.data;
    return status.success;
};

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
    const res = await api.addPost(post);
    const data = await res.data;
    return data.post;
});

// export const getComments = createAsyncThunk(
//     "posts/getComments",
//     async (postId) => {
//         const res = await api.getComments(postId);
//         const data = await res.data;
//         return data.comments;
//     }
// );
// export const postComment = createAsyncThunk(
//     "posts/postComment",
//     async (cmt) => {
//         const res = await api.postComment(cmt);
//         const data = await res.data;
//         return data.comment;
//     }
// );
// export const deleteComment = createAsyncThunk(
//     "posts/deleteComment",
//     async (cmtId) => {
//         const res = await api.deleteComment(cmtId);
//         const data = await res.data;
//         return data.success;
//     }
// );
