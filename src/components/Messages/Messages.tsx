import React from "react";
import Message from "./Message";

interface Props {
  username: string;
  message: string;
  setMessage: Function;
  handleSendMessage: Function;
  messages: { username: string; message: string }[];
}

const Messages: React.FC<Props> = (props) => {
  return (
    <div className="messages">
      <ul className="message-list scrollable">
        {props.messages.map((message, i) => (
          <Message
            key={i + message.username}
            message={message}
            username={props.username}
          />
        ))}
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSendMessage();
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={props.message}
          onChange={(event) => props.setMessage(event.target.value)}
          required={true}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
