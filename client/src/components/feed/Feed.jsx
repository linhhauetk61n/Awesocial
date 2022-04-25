import React from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector } from "react-redux";

const Feed = ({ userId, posts }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <div className="feed">
            <div className="feedWrapper">
                {userId === currentUser._id && <Share />}
                {posts?.map((p) => (
                    <Post post={p} key={p._id} currentUser={currentUser} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
