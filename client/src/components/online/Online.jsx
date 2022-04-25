import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./online.css";

const Online = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const onlineUsers = useSelector((state) => state.user.friendsOnline);
    const [online, setOnline] = useState(null);
    useEffect(() => {
        if (onlineUsers.includes(user._id)) {
            setOnline("online");
        } else {
            setOnline(null);
        }
    }, [onlineUsers, user]);
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img
                    className="rightbarProfileImg"
                    src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : "/assets/person/no-avatar.png"
                    }
                    alt=""
                />
                <span className={`rightbarOnline ` + online}></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    );
};

export default Online;
