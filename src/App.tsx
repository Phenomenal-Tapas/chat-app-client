import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io, Socket } from "socket.io-client";
import ConnectedUsers from "./components/Users/ConnectedUsers";
import EnterUsername from "./components/EnterUsername";
import Messages from "./components/Messages/Messages";

interface Users {
  id: string;
  username: string;
}

interface Message {
  message: string;
  username: string;
}

const App: React.FC = () => {
  const [connectedUsers, setConnectedUsers] = useState<Users[]>([] as Users[]);
  const [username, setUsername] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([] as Message[]);
  const [message, setMessage] = useState<string>("");

  const socketClient = useRef<Socket>();
  
  useEffect(() => {
    socketClient.current = io("https://chat-app-server-iikp.onrender.com");

    if (socketClient.current) {
      socketClient.current.on("username-created-successfully", () => {
        setConnected(true);
      });

      socketClient.current.on("username-taken", () => {
        toast.error("Username is taken!!");
      });

      socketClient.current.on(
        "get-connected-users",
        (connectedUsers: { id: string; username: string }[]) => {
          setConnectedUsers(
            connectedUsers.filter((user) => user.username !== username)
          );
        }
      );

      socketClient.current.on(
        "receive-message",
        (message: { message: string; username: string }) => {
          setMessages((prev) => [...prev, message]);
        }
      );
    }

    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [username]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", username);
    }
  };

  const handleSendMessage = () => {
    if (socketClient.current) {
      setMessages((prev) => [...prev, { message, username }]);
      socketClient.current.emit("message", { message, username });
      setMessage("");
    }
  };

  return (
    <div className="chat-app-container">
      {!connected && (
        <EnterUsername
          username={username}
          setUsername={setUsername}
          handleConnection={handleConnection}
        />
      )}

      {connected && (
        <>
          <ConnectedUsers connectedUsers={connectedUsers} />

          <Messages
            handleSendMessage={handleSendMessage}
            message={message}
            setMessage={setMessage}
            messages={messages}
            username={username}
          />
        </>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
