import React, { useCallback, useEffect, useState } from "react";
import {
  allChats,
  createChatNotification,
  fetchAllMessage,
  getAllChatNotification,
  sendMessage,
} from "../api/chat";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./css/chat.css";
import { getLoggedInUser } from "../api/auth";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  MessageList,
  ChatContainer,
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { getName, getSenderId } from "../helpers/message";
const Chat = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [Chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [allNotification, setAllNotification] = useState([]);
  var selectedChatCompare;

  //responsive side bar close and open

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [mainDivStyle, setMainDivStyle] = useState({});
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(
    (e) => {
      props.setSelectedChat(e);
      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    },
    [sidebarVisible, setSidebarVisible]
  );
  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        fontSize: "1.5vmax",
        marginRight: "2em",
      });
      setChatContainerStyle({
        display: "none",
      });
      setMainDivStyle({
        height: "76vh",
        position: "relative",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
      setMainDivStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);

  //end of side bar logic

  useEffect(() => {
    props.socket &&
      props.socket.emit("setup", loggedInUser && loggedInUser._id);
  });

  useEffect(() => {
    props.selectedChat && getAllMessages();
    selectedChatCompare = props.selectedChat;
  }, [props.selectedChat]);
  console.log(props.notification);
  useEffect(() => {
    props.socket &&
      props.socket.on("message received", (newMessageReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageReceived.chatId._id
        ) {
        } else {
          getAllMessages().then(function () {
            setAllMessage([...allMessage, newMessageReceived]);
          });

          // setAllMessage([...allMessage, newMessageReceived]);
        }
      });
  });

  useEffect(() => {
    fetchAllChats();
    getLoggedInUser().then(function (data) {
      setLoggedInUser(data.data);
    });
  }, []);

  const fetchAllChats = async () => {
    setLoading(true);
    allChats()
      .then(function (data) {
        if (data) {
          setChats(data.data);
          setLoading(false);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let sendMes = (content) => {
    setLoading2(true);
    console.log(allMessage);
    sendMessage(content, props.selectedChat._id)
      .then(function (data) {
        if (data) {
          setMessageInputValue("");
          setAllMessage([...allMessage, data.data]);
          props.setNotification([data.data]);
          setLoading2(false);
          props.socket && props.socket.emit("new message", data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let addNotification = () => {
    if (props.notification.length !== 0) {
      let notificationId = props.notification && props.notification[0]._id;
      let userId =
        props.notification &&
        props.notification[0].chatId.users[0] ===
          props.notification[0].sender._id
          ? props.notification[0].chatId.users[1]
          : props.notification[0].chatId.users[0];
      createChatNotification(notificationId, userId)
        .then(function (data) {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  let getAllMessages = () => {
    setLoading3(true);
    fetchAllMessage(props.selectedChat._id)
      .then(function (data) {
        if (data) {
          setAllMessage(data.data);
          props.socket &&
            props.socket &&
            props.socket.emit("join chat", props.selectedChat._id);
          setLoading3(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    addNotification();
  }, [props.notification]);

  return (
    <div className="main-div" style={mainDivStyle}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true} style={sidebarStyle}>
          <ConversationList className="p-3">
            {loading ? (
              <Loader />
            ) : !Chats.length ? (
              <h4>No chats yet !!</h4>
            ) : (
              Chats.map((e, i) => (
                <Conversation
                  key={e._id}
                  onClick={() => {
                    handleConversationClick(e);
                  }}
                  className="d-flex align-items-center justify-content-center"
                  style={{ fontSize: "1.4em" }}
                >
                  <Avatar
                    className="avataar d-flex align-items-center justify-content-center"
                    style={conversationAvatarStyle}
                  >
                    {loggedInUser &&
                      getName(loggedInUser._id, e.users)[0].toUpperCase()}
                  </Avatar>
                  <Conversation.Content
                    name={loggedInUser && getName(loggedInUser._id, e.users)}
                    style={conversationContentStyle}
                    info={e.latestMessage && e.latestMessage.content}
                  />
                </Conversation>
              ))
            )}
          </ConversationList>
        </Sidebar>

        <ChatContainer style={chatContainerStyle}>
          <ConversationHeader style={{ fontSize: "1.3em" }}>
            <ConversationHeader.Back onClick={handleBackClick} />
            {props.selectedChat ? (
              <Avatar
                className="d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "whitesmoke" }}
              >
                {getName(
                  loggedInUser && loggedInUser._id,
                  props.selectedChat.users
                )[0].toUpperCase()}
              </Avatar>
            ) : (
              ""
            )}
            <ConversationHeader.Content
              userName={
                props.selectedChat &&
                getName(
                  loggedInUser && loggedInUser._id,
                  props.selectedChat.users
                )
              }
            />
          </ConversationHeader>
          <MessageList>
            {!props.selectedChat ? (
              <h4 className="mt-4">Select a User to continue Chatting !</h4>
            ) : loading3 ? (
              <Loader className="m-5 " />
            ) : !allMessage.length ? (
              <h3 className="mt-4">No messages yet !</h3>
            ) : (
              allMessage.map((e) => (
                <Message
                  key={e._id}
                  className="mt-3"
                  style={{ fontSize: "1.4em" }}
                  model={{
                    message: e.content,

                    direction:
                      loggedInUser && e.sender._id == loggedInUser._id
                        ? "outgoing"
                        : "incoming",
                    position: "single",
                  }}
                ></Message>
              ))
            )}
          </MessageList>

          <MessageInput
            onSend={() => {
              props.selectedChat && sendMes(messageInputValue);
            }}
            style={{ fontSize: "1.5em" }}
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;