import React from "react";
import "./conversations.css";
import * as api from "../../api";

const Conversations = ({ conversation, currentUser }) => {
    const [user, setUser] = React.useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await api.getUser(friendId);
                setUser(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [conversation, currentUser, friendId]);
    return (
        <div className="conversation">
            <img
                src={
                    user?.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/no-avatar.png"
                }
                alt=""
                className="conversationImg"
            />
            <div className="conversationInfo">
                <span className="conversationName">{user?.username}</span>
                <span className="conversationText">Click to chat </span>
            </div>
        </div>
    );
};

export default Conversations;
