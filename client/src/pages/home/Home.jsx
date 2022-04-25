import React, { useEffect } from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getTimeline } from "../../actions/PostActions";
const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTimeline());
    }, [dispatch]);
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed userId={currentUser._id} posts={posts} />
                <Rightbar userId={currentUser._id} />
            </div>
        </>
    );
};

export default Home;
