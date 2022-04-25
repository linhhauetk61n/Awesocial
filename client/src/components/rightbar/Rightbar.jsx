import React, { useEffect } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../actions/AuthActions";
const Rightbar = ({ userId }) => {
    const { friends } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends(userId));
    }, [dispatch, userId]);
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img
                        className="birthdayImg"
                        src="/assets/gift.png"
                        alt=""
                    />
                    <span className="birtdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a
                        birthday today
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Friends</h4>
                <ul className="rightbarFriendList">
                    {friends.map((friend) => (
                        <Link
                            to={`/profile/${friend._id}`}
                            key={friend._id}
                            style={{ textDecoration: "none" }}
                        >
                            <Online user={friend} key={friend._id} />
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Rightbar;
