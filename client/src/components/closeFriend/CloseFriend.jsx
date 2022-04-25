import React from "react";
import "./closeFriend.css";

const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="sidebarFriend">
            <img
                src={
                    user.profilePicture
                        ? PF + user.profilePicture
                        : "/assets/person/no-avatar.png"
                }
                alt=""
                className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
};

export default CloseFriend;
