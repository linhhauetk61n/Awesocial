import React from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import ChatWindow from "../../components/chatWindow/ChatWindow";
import Conversations from "../../components/conversations/Conversations";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../actions/MessengerActions";

const Messenger = ({ socket }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const conversations = useSelector((state) => state.messenger.conversations);
    const [currentConv, setCurrentConv] = React.useState(null);

    React.useEffect(() => {
        dispatch(getConversations());
    }, [currentUser, dispatch]);
    // const socket = React.useRef();

    //Get message from socket
    const [arriverMessage, setArriverMessage] = React.useState(null);
    React.useEffect(() => {
        // socket.current = io("ws://localhost:8900");
        socket.on("getMessage", (data) => {
            setArriverMessage({
                sender: data.senderId,
                messageText: data.text,
                createdAt: Date.now(),
            });
        });
    }, [socket]);
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder="Search for friends..."
                            className="chatMenuInput"
                        />
                        {conversations?.map((conv) => (
                            <div
                                onClick={() => setCurrentConv(conv)}
                                key={conv._id}
                            >
                                <Conversations
                                    conversation={conv}
                                    currentUser={currentUser}
                                    key={conv._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <ChatWindow
                            currentConv={currentConv}
                            currentUser={currentUser}
                            socket={socket}
                            arriverMessage={arriverMessage}
                        />
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            currentUserId={currentUser._id}
                            setCurrentConv={setCurrentConv}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
