import React, { useEffect, useState } from "react";
import "./rightbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFriends } from "../../api";

const ProfileRightbar = ({ user, userId }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { currentUser, friends } = useSelector((state) => state.user);
    const [userFriends, setUserFriends] = useState([]);
    useEffect(() => {
        if (user._id === currentUser._id) {
            setUserFriends(friends);
        } else {
            const getUserFriends = async () => {
                const res = await getFriends(userId);
                const data = await res.data;
                setUserFriends(data.friends);
            };
            getUserFriends();
        }
    }, [currentUser, friends, user, userId]);
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <h4 className="rightbarTitle">User Infomation</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">
                            {user.city ? user.city : "---"}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">
                            {user.from ? user.from : "---"}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 2
                                ? "Married"
                                : "---"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {userFriends.map((friend) => (
                        <Link
                            to={`/profile/${friend._id}`}
                            key={friend._id}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="rightbarFollowing" key={friend._id}>
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : "/assets/person/no-avatar.png"
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileRightbar;
