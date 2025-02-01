import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinRoomForm from "./JoinRoomForm";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import Chat from "./Chat";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const socket = io(backend_url);
// import "./index.css";
function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]); // Changed to "messages" for clarity
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    console.log("socket connected in frontend", socket.connected);

    socket.on("connect", () => {
      // console.log("socket connected in frontend", socket.connected);
      setConnected(true);
    });
    socket.on("disconnect", () => {
      // console.log("socket connected in frontend", socket.connected);
      setConnected(false);
    });
    return () => {
      socket.off("disconnect");
      socket.off("connect");
    };
  }, [connected]);

  useEffect(() => {
    socket.on("recieve_message", ({ username, message }) => {
      setMessages((prevMessages) => [...prevMessages, { username, message }]);
    });

    return () => {
      socket.off("recieve_message");
    };
  }, []);

  const handleEnterChatRoom = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      setChatVisible(true);
      // setMessage("");
      socket.emit("join_room", { username, room });
      console.log(`Joining room: ${room} with username: ${username}`);
      // navigate("/chat");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessageData = { username, message: newMessage, room };
    socket.emit("send_message", newMessageData);
    setMessages((prevMessages) => [...prevMessages, newMessageData]);
    setNewMessage("");
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}

          <Route
            path="/"
            element={
              <JoinRoomForm
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                chatVisible={chatVisible}
                messages={messages}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                handleEnterChatRoom={handleEnterChatRoom}
                newMessage={newMessage}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* <JoinRoomForm /> */}
    </>
  );
}

export default App;
