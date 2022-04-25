import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import ScrollOnTop from "./components/scrollOnTop/ScrollOnTop";
import Messenger from "./pages/messenger/Messenger";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "./redux/userSlice";
import { socket } from "./api/socketio";
function App() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // const socket = React.useRef();
    useEffect(() => {
        if (currentUser) {
            socket.emit("addUser", currentUser._id);
            socket.on("getUsers", (users) => {
                setUserOnl(
                    currentUser.followings.filter((f) =>
                        users.some((u) => u.userId === f)
                    )
                );
            });
        }
    }, [currentUser]);
    const [usersOnl, setUserOnl] = useState([]);
    useEffect(() => {
        dispatch(userSlice.actions.setFriendsOnline(usersOnl));
    }, [usersOnl, dispatch]);

    return (
        <Router>
            <ScrollOnTop />
            <Routes>
                <Route
                    path="/"
                    exact
                    element={!currentUser ? <Navigate to="/login" /> : <Home />}
                />
                <Route
                    path="/profile/:userId"
                    element={
                        !currentUser ? <Navigate to="/login" /> : <Profile />
                    }
                />
                <Route
                    path="/messenger"
                    element={
                        !currentUser ? (
                            <Navigate to="/" />
                        ) : (
                            <Messenger socket={socket} />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={currentUser ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={currentUser ? <Navigate to="/" /> : <Register />}
                />
            </Routes>
        </Router>
    );
}

export default App;
