import React from "react";
import "./chatWindow.css";
import Message from "../message/Message";
import * as api from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../../actions/MessengerActions";
import { messengerSlice } from "../../redux/messengerSlice";
const ChatWindow = ({ currentConv, currentUser, socket, arriverMessage }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const messages = useSelector((state) => state.messenger.messages);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (currentConv) {
            dispatch(getMessages(currentConv._id));
        }
    }, [currentConv, dispatch]);

    const [receiver, getReceiver] = React.useState(null);
    const receiverId = currentConv?.members.find((m) => m !== currentUser._id);
    React.useMemo(() => {
        const getUser = async () => {
            if (receiverId) {
                try {
                    const res = await api.getUser(receiverId);
                    getReceiver(res.data.user);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getUser();
    }, [receiverId]);
    const [newMessage, setNewMessage] = React.useState("");
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            conversationId: currentConv._id,
            messageText: newMessage,
        };
        socket.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId: receiverId,
            text: newMessage,
        });
        dispatch(sendMessage(message));
        setNewMessage("");
    };

    //Update messages
    React.useEffect(() => {
        arriverMessage &&
            currentConv?.members.includes(arriverMessage.sender) &&
            dispatch(messengerSlice.actions.sendMessage(arriverMessage));
    }, [arriverMessage, currentConv, dispatch]);

    //Auto scroll and focus
    React.useEffect(() => {
        scrollRef.current?.scrollIntoView();
        textMessageRef.current?.focus();
    }, [messages]);
    const scrollRef = React.useRef();
    const textMessageRef = React.useRef();
    return (
        <div className="chatWindow">
            {currentConv ? (
                <>
                    <div className="chatBoxTop">
                        <div className="chatBoxTopInfo">
                            <img
                                src={
                                    receiver?.profilePicture
                                        ? PF + receiver.profilePicture
                                        : PF + "person/no-avatar.png"
                                }
                                alt=""
                                className="chatBoxTopImg"
                            />
                            <span className="chatBoxTopName">
                                {receiver?.username}
                            </span>
                        </div>
                    </div>
                    <div className="chatBoxCenter">
                        {messages?.map((mess) => (
                            <div key={mess._id} ref={scrollRef}>
                                <Message
                                    message={mess}
                                    receiver={receiver}
                                    // type={currentUser._id === mess.sender}
                                    currentUser={currentUser}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            ref={textMessageRef}
                            placeholder="Write something ..."
                            className="chatMessageInput"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                        <button
                            className="chatMessageButton"
                            onClick={handleSendMessage}
                        >
                            SEND
                        </button>
                    </div>
                </>
            ) : (
                <span className="noConversation">
                    Open a conversation to start a chat
                </span>
            )}
        </div>
    );
};

export default ChatWindow;
