import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

interface ChatProps {
  userCount: number;
  socket: any;
}

interface DecodedToken {
  id: string;
  username: string;
  avatar: string;
  ranks: { [key: string]: number };
}

interface Message {
  sender: string;
  text: string;
  avatar: string;
  ranks: { [key: string]: number }; // Add ranks to the message
}

interface User {
  id: string;
  username: string;
  avatar: string;
}

const Chat: React.FC<ChatProps> = ({ userCount, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Track selected user
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Track pop-up visibility
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on("chat_message", (message: Message | null) => {
      if (message && message.sender && message.text && message.avatar) {
        if (message.sender !== userData?.username) {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, message];
            return updatedMessages;
          });
        }
      } else {
        console.error("Received invalid message:", message);
      }
    });

    socket.on("update_user_count", (count: number) => {
      console.log(`Connected users: ${count}`);
    });

    socket.on("update_user_list", (users: User[]) => {
      setUserList(users);
    });

    socket.on("kick_user", (userId: string) => {
      if (userData?.id === userId) {
        // If the current user is kicked, redirect to the home page
        alert("You have been kicked from the chat!");
        navigate("/");
      }
    });

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwt_decode(token);
        setUserData({
          id: decodedToken.id,
          username: decodedToken.username,
          avatar: decodedToken.avatar,
          ranks: decodedToken.ranks,
        });

        socket.emit("set_user_data", {
          id: decodedToken.id,
          username: decodedToken.username,
          avatar: decodedToken.avatar,
        });
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }

    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    return () => {
      socket.off("chat_message");
      socket.off("update_user_list");
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() && userData) {
      const message: Message = {
        sender: userData.username,
        text: newMessage,
        avatar: userData.avatar,
        ranks: userData.ranks,
      };

      socket.emit("chat_message", message);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        return updatedMessages;
      });

      setNewMessage("");
    }
  };

  const toggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  const getHighestRole = (ranks: { [key: string]: number }) => {
    if (ranks.admin === 1) return "admin";
    if (ranks.helper === 1) return "helper";
    if (ranks.vip === 1) return "vip";
    return "Demo";
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <span className="badge badge-lg badge-error">Admin</span>;
      case "helper":
        return <span className="badge badge-lg badge-primary">Helper</span>;
      case "vip":
        return <span className="badge badge-lg badge-success">VIP</span>;
      default:
        return <span className="badge badge-lg badge-secondary">Demo</span>;
    }
  };

  const handleAvatarClick = (user: User) => {
    if (userData?.ranks.admin === 1) {
      setSelectedUser(user);
      setIsPopupVisible(true);
    }
  };

  const handleKickUser = (userId: string) => {
    socket.emit("kick_user", userId);
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white">
      <div className="w-full max-w-3xl h-full flex flex-col p-6 bg-opacity-20 backdrop-blur-md rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-100 tracking-wide"><span className="text-orange-400">BURGER</span>ANIME <span className="text-black">CHAT</span></h2>
        <p className="text-center text-sm text-gray-300 mb-4">Connected Users: {userCount}</p>

        <button
          onClick={toggleUserList}
          className="btn btn-outline btn-accent mb-4 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isUserListVisible ? "Hide Users" : "Show Users"}
        </button>

        {isUserListVisible && (
          <div className="absolute top-16 right-10 w-64 bg-white text-black rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform opacity-95">
            <h3 className="font-semibold mb-2 text-xl text-indigo-700">Connected Users</h3>
            <ul className="space-y-3 overflow-y-auto">
              {userList.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-2 hover:bg-indigo-50 rounded-md p-2 cursor-pointer"
                  onClick={() => handleAvatarClick(user)}
                >
                  <img
                    src={user.avatar}
                    alt={`${user.username} Avatar`}
                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                  />
                  <span className="font-semibold text-sm">{user.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {userData && (
          <div className="flex items-center mb-4">
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-indigo-600 mr-2 shadow-md"
            />
            <span className="font-bold text-xl text-indigo-100">{userData.username}</span>
            <div className="ml-4 flex gap-2">
              {userData.ranks && getRoleBadge(getHighestRole(userData.ranks))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 bg-black/40 rounded-lg scrollbar-thin scrollbar-thumb-indigo-600 shadow-inner">
        {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`my-3 p-4 rounded-xl transition-all duration-300 ease-in-out ${
                  msg.sender === userData?.username
                    ? "bg-indigo-600 text-white self-end"
                    : msg.sender === "System"
                    ? "bg-gray-600 text-white self-start" // Align system messages to the left, not centered
                    : "bg-indigo-200 text-black self-start"
                }`}
              >
                {/* Check if message is from system or user */}
                {msg.sender === "System" ? (
                  <div className="flex items-start gap-2">
                    <img
                      src={msg.avatar}
                      alt="System Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p>{msg.sender}</p>
                  </div>
                ) : (
                  <Link
                    to={`/profile/${userList.find(user => user.username === msg.sender)?.id}`}
                    className="flex items-center gap-3 mb-2"
                  >
                    <img
                      src={msg.avatar}
                      alt={`${msg.sender} Avatar`}
                      className="w-8 h-8 rounded-full border-2 border-indigo-600"
                    />
                    <span className="font-semibold text-md">{msg.sender}</span>

                    {/* Only show rank for other users */}
                    {msg.sender !== userData?.username && (
                      <div className="ml-4 flex gap-2">
                        {getRoleBadge(getHighestRole(msg.ranks))}
                      </div>
                    )}
                  </Link>
                )}
                <p className="font-bold">{msg.text}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No messages yet...</p>
          )}


        </div>

        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 input input-bordered input-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full px-4 py-2 bg-black/60 text-white placeholder-gray-300 shadow-md transition duration-200 ease-in-out"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="btn btn-primary rounded-full text-lg p-3 hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

        {/* Admin Kick User Pop-up */}
        {isPopupVisible && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-black w-64">
              <h3 className="text-lg font-semibold">Kick User</h3>
              <p>Are you sure you want to kick {selectedUser.username}?</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsPopupVisible(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleKickUser(selectedUser.id)}
                >
                  Kick
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
