import React from "react";
import "./dropdownUser.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { postsSlice } from "../../redux/postsSlice";
import { messengerSlice } from "../../redux/messengerSlice";

const DropdownUser = ({ user, setDropdownUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userSlice.actions.logout());
        dispatch(postsSlice.actions.logout());
        dispatch(messengerSlice.actions.logout());
    };

    window.onClick = (e) => {
        if (e.target.matches(".dropdownContainer")) {
            setDropdownUser(false);
        }
    };

    return (
        <div className="dropdownContainer">
            <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none" }}
            >
                <div className="userProfile">
                    <img
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : "/assets/person/no-avatar.png"
                        }
                        alt=""
                        className="avatar"
                    />
                    <div className="info">
                        <span className="username">{user.username}</span>
                        <span className="desc">See your profile</span>
                    </div>
                </div>
            </Link>

            <ul className="listItem">
                <button className="item" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </ul>
        </div>
    );
};

export default DropdownUser;
