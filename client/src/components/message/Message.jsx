import React from "react";
import "./message.css";
import moment from "moment";

const Message = ({ message, receiver, currentUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [messageSender, setMessageSender] = React.useState(null);
    const [typeMessage, setTypeMessage] = React.useState("");
    React.useMemo(() => {
        if (currentUser._id === message.sender) {
            setTypeMessage("outgoing");
            setMessageSender(currentUser);
        } else {
            setTypeMessage("ingoing");
            setMessageSender(receiver);
        }
    }, [currentUser, message, receiver]);

    return (
        <div className={"message " + typeMessage}>
            <div className="messageInfo">
                <img
                    src={
                        messageSender?.profilePicture
                            ? PF + messageSender.profilePicture
                            : PF + "person/no-avatar.png"
                    }
                    alt=""
                    className="messageInfoImg"
                />
                <span className="messageInfoName">
                    {messageSender?.username}
                </span>
            </div>
            <span className="messageText">{message.messageText}</span>
            <span className="messageTime">{moment(message.createdAt)}</span>
        </div>
    );
};

export default Message;
