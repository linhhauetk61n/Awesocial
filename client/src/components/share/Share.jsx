import "./share.css";

import React from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

import { Link } from "react-router-dom";

import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadFile } from "../../actions/PostActions";

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [description, setDescription] = React.useState("");
    const [img, setImg] = React.useState(null);

    const handleResetForm = () => {
        setDescription("");
        setImg(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: currentUser._id,
            description,
        };
        if (img) {
            if (img) {
                const data = new FormData();
                const fileName =
                    Date.now() + "_" + currentUser._id + "_" + img.name;
                data.append("name", fileName);
                data.append("file", img);
                if (uploadFile(data)) {
                    newPost.img = fileName;
                }
            } else {
                newPost.img = "";
            }
        }
        dispatch(addPost(newPost));
        handleResetForm();
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${currentUser._id}`}>
                        <img
                            src={
                                currentUser.profilePicture
                                    ? PF + currentUser.profilePicture
                                    : "/assets/person/no-avatar.png"
                            }
                            alt=""
                            className="shareProfileImg"
                        />
                    </Link>

                    <input
                        type="text"
                        className="shareInput"
                        placeholder={`What's in your mind ?`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <hr className="shareHr" />
                {img && (
                    <div className="shareImgContainer">
                        <img
                            src={URL.createObjectURL(img)}
                            alt=""
                            className="shareImg"
                        />
                        <CancelIcon
                            className="shareCancelImg"
                            onClick={() => setImg(null)}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <div className="shareOptions">
                            <label htmlFor="file">
                                <PermMedia
                                    htmlColor="tomato"
                                    className="shareOptionIcon"
                                />
                                <span className="shareOptionText">
                                    Photo or Video
                                </span>
                                <input
                                    type="file"
                                    id="file"
                                    accept=".png, .jpeg, .jpg"
                                    style={{ display: "none", width: "0" }}
                                    onChange={(e) => setImg(e.target.files[0])}
                                />
                            </label>
                        </div>

                        <div className="shareOption">
                            <Label
                                htmlColor="blue"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Tags</span>
                        </div>
                        <div className="shareOption">
                            <Room
                                htmlColor="green"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                                htmlColor="gold"
                                className="shareOptionIcon"
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Share;
