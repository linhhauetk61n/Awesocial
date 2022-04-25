import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/rightbar/ProfileRightbar";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { useParams } from "react-router";
import EditProfileModal from "../../components/editProfileModal/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api";
import { followUser, unfollowUser } from "../../actions/AuthActions";
import { getAllPosts } from "../../actions/PostActions";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { currentUser } = useSelector((state) => state.user);
    const { posts } = useSelector((state) => state.posts);
    const params = useParams();
    const [user, setUser] = React.useState({});
    const [followed, setFollowed] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (params.userId === currentUser._id) {
            setUser(currentUser);
        } else {
            const fetchUser = async () => {
                const res = await getUser(params.userId);
                setUser(res.data.user);
                setFollowed(currentUser.followings.includes(params.userId));
            };
            fetchUser();
        }
    }, [params, currentUser]);
    React.useEffect(() => {
        dispatch(getAllPosts(params.userId));
    }, [params, dispatch]);

    const handleFollow = async () => {
        if (followed) {
            dispatch(unfollowUser(user._id));
        } else {
            dispatch(followUser(user._id));
        }
        setFollowed(!followed);
    };
    return (
        <>
            <EditProfileModal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <Topbar />
            <>
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img
                                    src={
                                        user.coverPicture
                                            ? PF + user.coverPicture
                                            : "/assets/person/no-cover.png"
                                    }
                                    alt=""
                                    className="profileBackgroundImg"
                                />

                                <img
                                    src={
                                        user.profilePicture
                                            ? `${PF}${user.profilePicture}`
                                            : "/assets/person/no-avatar.png"
                                    }
                                    alt=""
                                    className="profileUserImg"
                                />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">
                                    {user.username}
                                </h4>
                                <span className="profileInfoDesc">
                                    {user.description}
                                </span>
                            </div>
                            {currentUser._id !== params.userId &&
                                (followed ? (
                                    <button
                                        className="profileButton"
                                        onClick={handleFollow}
                                        style={{
                                            backgroundColor: "#e4e6eb",
                                            color: "#1d1f23",
                                        }}
                                    >
                                        <PersonAddRoundedIcon
                                            style={{ fontSize: 30 }}
                                        />
                                        <span className="profileButtonText">
                                            Unfollow
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        className="profileButton"
                                        onClick={handleFollow}
                                        style={{
                                            backgroundColor: "#e7f3ff",
                                            color: "#0571ed",
                                        }}
                                    >
                                        <PersonAddRoundedIcon
                                            style={{ fontSize: 30 }}
                                        />
                                        <span className="profileButtonText">
                                            Follow
                                        </span>
                                    </button>
                                ))}
                            {currentUser._id === params.userId && (
                                <button
                                    className="profileButton"
                                    onClick={() => setShowModal(true)}
                                >
                                    <EditRoundedIcon
                                        className="profileButtonIcon"
                                        style={{ color: "#036ee3" }}
                                    />
                                    <span
                                        className="profileButtonText"
                                        style={{ color: "#036ee3" }}
                                    >
                                        Edit your profle
                                    </span>
                                </button>
                            )}
                        </div>

                        <div className="profileRightBottom">
                            <Feed userId={user._id} posts={posts} />
                            <ProfileRightbar
                                user={user}
                                userId={params.userId}
                            />
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default Profile;
