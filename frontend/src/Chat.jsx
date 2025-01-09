import PropTypes from "prop-types";

const Chat = ({
  username,
  room,
  socket,
  handleSendMessage,
  setNewMessage,
  message,
  setMessage,
}) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="flex items-center justify-between p-4 text-white bg-blue-500">
        <h1 className="text-xl font-bold">Room: {room}</h1>
        <span>{username}</span>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <div className="space-y-4">
          {message.map((msg, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="font-semibold text-blue-600">{msg.username}:</div>
              <div>{msg.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <footer className="flex p-4 bg-gray-800">
        <input
          type="text"
          className="w-full p-2 border-none rounded-md focus:outline-none"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="p-2 ml-2 text-white bg-blue-500 rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  message: PropTypes.arrayOf(PropTypes.object).isRequired,
  // room: PropTypes.string.isRequired,
  //
  room: PropTypes.string.isRequired,
  // socket: PropTypes.object.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired,
};

export default Chat;
