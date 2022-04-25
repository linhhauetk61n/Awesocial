import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../api";
import decode from "jwt-decode";

import {
    followUser,
    getFriends,
    getPeople,
    login,
    register,
    unfollowUser,
    updateCurrentUser,
    checkLogin,
} from "../actions/AuthActions";

const checkLocalStorage = () => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE) !== null) {
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE)
        );
        const decodedToken = decode(user?.accessToken);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            localStorage.clear();
            setAuthToken(null);
            return null;
        } else {
            setAuthToken(user.accessToken);

            return user;
        }
    } else {
        return null;
    }
};
const updateUser = (newUser) => {
    const currentUser = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE)
    );
    const newCurrrentUser = { ...currentUser, ...newUser };

    localStorage.setItem(
        process.env.REACT_APP_LOCALSTORAGE,
        JSON.stringify(newCurrrentUser)
    );
};

const INITIAL_STATE = {
    currentUser: checkLocalStorage(),
    friends: [],
    people: [],
    friendsOnline: [],
    isFetching: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            setAuthToken(null);
            state.currentUser = null;
            state.friends = [];
            state.people = [];
            state.friendsOnline = [];
            state.isFetching = false;
        },
        setFriendsOnline: (state, action) => {
            state.friendsOnline = [...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALSTORAGE,
                    JSON.stringify(action.payload)
                );
                setAuthToken(action.payload.accessToken);
                state.currentUser = action.payload;
                state.isFetching = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.currentUser = null;
                state.isFetching = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALSTORAGE,
                    JSON.stringify(action.payload)
                );
                setAuthToken(action.payload.accessToken);
                state.currentUser = action.payload;
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = [...action.payload];
            })
            .addCase(getPeople.fulfilled, (state, action) => {
                state.people = [...action.payload];
            })
            .addCase(followUser.fulfilled, (state, action) => {
                updateUser(action.payload.currentUser);
                state.currentUser = action.payload.currentUser;
                state.friends.push(action.payload.user);
                state.people = state.people.filter(
                    (p) => p._id !== action.payload.user._id
                );
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                updateUser(action.payload.currentUser);
                state.currentUser = action.payload.currentUser;
                state.friends = state.friends.filter(
                    (friend) => friend._id !== action.payload.id
                );
                state.people.push(action.payload.user);
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                updateUser(action.payload);
                state.currentUser = action.payload;
            });
    },
});
