import { MoreVert } from "@material-ui/icons";
import React from "react";
import "./commentBox.css";
import moment from "moment";
import { getUser } from "../../api";
const CommentBox = ({ comment, currentUser, handleDeleteComment }) => {
    const [commentOwner, setCommentOwner] = React.useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    React.useEffect(() => {
        const getCommentOwner = async () => {
            const res = await getUser(comment.userId);
            setCommentOwner(res.data.user);
        };
        getCommentOwner();
    }, [comment]);
    const [commentOption, setCommentOption] = React.useState(false);
    const handleDelete = () => {
        handleDeleteComment(comment._id);
    };
    return (
        <div className="commentBox">
            <img
                src={
                    commentOwner?.profilePicture
                        ? PF + commentOwner?.profilePicture
                        : "/assets/person/no-avatar.png"
                }
                alt=""
                className="commentImg"
            />
            <div className="commentContent">
                <span className="commentUsername">
                    {commentOwner?.username}
                </span>
                <span className="commentText">{comment?.comment}</span>
            </div>
            <div className="commentOptions">
                <MoreVert onClick={() => setCommentOption(!commentOption)} />
                {commentOption && (
                    <div className="commentOptionActions">
                        {currentUser._id === comment.userId ? (
                            <button
                                className="commentOptionAction"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        ) : (
                            <button className="commentOptionAction">
                                Report
                            </button>
                        )}
                    </div>
                )}
            </div>
            <span className="commentDate">
                {moment(comment.createdAt).fromNow()}
            </span>
        </div>
    );
};

export default CommentBox;
