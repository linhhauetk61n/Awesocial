import React from "react";
import "./chatOnline.css";
import * as api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { messengerSlice } from "../../redux/messengerSlice";
const ChatOnline = ({ currentUserId, setCurrentConv }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { friends, friendsOnline } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleClick = async (user) => {
        try {
            const res = await api.getConversation(currentUserId, user._id);
            if (res.data.conversation) {
                setCurrentConv(res.data.conversation);
            } else {
                const res1 = await api.createConversation({
                    senderId: currentUserId,
                    receiverId: user._id,
                });
                dispatch(
                    messengerSlice.actions.createConversation(
                        res1.data.conversation
                    )
                );
                setCurrentConv(res1.data.conversation);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <span className="chatOnlineText">Friends Online</span>
            <ul className="chatOnlineUserList">
                {friends.map((f) => (
                    <li
                        className="chatOnlineUser"
                        onClick={() => handleClick(f)}
                        key={f._id}
                    >
                        <div className="chatOnlineImgContainer">
                            <img
                                className="chatOnlineImg"
                                src={
                                    f?.profilePicture
                                        ? PF + f.profilePicture
                                        : PF + "person/no-avatar.png"
                                }
                                alt=""
                            />

                            <span
                                className={
                                    `chatOnlineDot ` +
                                    (friendsOnline?.includes(f._id)
                                        ? "online"
                                        : null)
                                }
                            ></span>
                        </div>
                        <span className="chatOnlineName">{f.username}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ChatOnline;
