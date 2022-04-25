import React, { useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CommentBox from "../commentBox/CommentBox";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../actions/PostActions";
import { getComments, postComment, deleteComment } from "../../api/index";

const Post = ({ post, currentUser }) => {
    const [like, setLike] = React.useState(post.likes.length);
    const [isLike, setIsLike] = React.useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [optionActions, setOptionActions] = React.useState(false);
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    const likeHandle = () => {
        dispatch(likePost(post._id));
        setLike(isLike ? like - 1 : like + 1);
        setIsLike(!isLike);
    };
    React.useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id));
    }, [currentUser, post.likes]);
    const [user, setUser] = useState({});
    useEffect(() => {
        if (post.userId === currentUser._id) {
            setUser(currentUser);
        } else {
            setUser(friends.find((f) => f._id === post.userId));
        }
    }, [post, currentUser, friends]);
    const handleDelete = () => {
        dispatch(deletePost(post._id));
    };
    const [commentBox, setCommentBox] = React.useState(false);
    const [commentPost, setCommentPost] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const handleDeleteComment = (commentId) => {
        const deleteCmt = async () => {
            const res = await deleteComment(commentId);
            const data = await res.data;
            if (data.success) {
                setComments(comments.filter((c) => c._id !== commentId));
            }
        };
        deleteCmt();
    };
    const handlePostComment = () => {
        const cmt = {
            postId: post._id,
            userId: currentUser._id,
            comment: commentPost,
        };

        const postCmt = async () => {
            const res = await postComment(cmt);
            const data = await res.data;
            if (data.success) {
                setComments([res.data.comment, ...comments]);
            }
        };
        postCmt();
        setCommentPost("");
    };
    React.useState(() => {
        const getCmts = async () => {
            const res = await getComments(post._id);
            const data = await res.data;

            if (data.success) {
                setComments(
                    res.data.comments.sort((c1, c2) => {
                        return new Date(c2.createdAt) - new Date(c1.createdAt);
                    })
                );
            }
        };
        getCmts();
    }, [post, comments]);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link
                            to={`/profile/${user?._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <img
                                src={
                                    user?.profilePicture
                                        ? PF + user.profilePicture
                                        : "/assets/person/no-avatar.png"
                                }
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>
                        <Link
                            to={`/profile/${user?._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <span className="postUsername">
                                {user?.username}
                            </span>
                        </Link>

                        <span className="postDate">
                            {moment(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert
                            className="postOptionButton"
                            onClick={() => setOptionActions(!optionActions)}
                        />
                        {optionActions && (
                            <div className="postOptionActions">
                                {currentUser._id === post.userId ? (
                                    <button
                                        className="postOptionAction"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    <button className="postOptionAction">
                                        Report
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.description}</span>
                    <img
                        className="postImg"
                        src={post.img === "" ? post.img : PF + post.img}
                        alt=""
                    />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div
                            className={"likeBox " + (isLike ? "like" : " ")}
                            onClick={likeHandle}
                        >
                            <ThumbUpAltOutlinedIcon className="likeIcon" />
                            <span className="likeText">Thích</span>
                        </div>
                        <span className="postLikeCounter">
                            {like} people liked it
                        </span>
                    </div>
                    <div className="postBottomCenter"></div>
                    <div className="postBottomRight">
                        <span
                            className="postCommentText"
                            onClick={() => setCommentBox(!commentBox)}
                        >
                            {comments.length} comments
                        </span>
                    </div>
                </div>
            </div>
            {commentBox && (
                <>
                    <div className="commentWrapper">
                        <div className="commentTop">
                            <img
                                src={
                                    currentUser.profilePicture
                                        ? PF + currentUser.profilePicture
                                        : "/assets/person/no-avatar.png"
                                }
                                alt=""
                                className="commentUser"
                            />
                            <input
                                type="text"
                                className="commentInput"
                                placeholder="Write a comment ..."
                                value={commentPost}
                                onChange={(e) => setCommentPost(e.target.value)}
                            />
                            <button
                                className="commentBtn"
                                onClick={handlePostComment}
                            >
                                Post comment
                            </button>
                        </div>
                        <div className="commentBottom">
                            {comments.map((c) => (
                                <CommentBox
                                    comment={c}
                                    currentUser={currentUser}
                                    handleDeleteComment={handleDeleteComment}
                                    key={c._id}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
