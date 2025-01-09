import PropTypes from "prop-types";

const JoinRoomForm = ({
  username,
  handleEnterChatRoom,
  setUsername,
  room,
  setRoom,
  chatVisible,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return chatVisible ? (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 text-white bg-blue-500">
        <h1 className="text-xl font-bold">Room: {room}</h1>
        <span>{username}</span>
      </header>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="font-semibold text-blue-600">{msg.username}:</div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
      <footer className="flex p-4 bg-gray-800">
        <input
          type="text"
          className="w-full p-2 border-none rounded-md focus:outline-none"
          placeholder="Type a message"
          value={newMessage}
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
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Join Room</h2>
        <form onSubmit={handleEnterChatRoom}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-gray-700">
              Room
            </label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter room name"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

JoinRoomForm.propTypes = {
  username: PropTypes.string.isRequired,
  handleEnterChatRoom: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  setRoom: PropTypes.func.isRequired,
  chatVisible: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
};

export default JoinRoomForm;
