import React from "react";

interface Props {
  username: string;
  setUsername: Function;
  handleConnection: Function;
}

const EnterUsername: React.FC<Props> = (props) => {
  return (
    <form
      className="enter-username-form"
      onSubmit={(event) => {
        event.preventDefault();
        props.handleConnection();
      }}
    >
      <input
        type="text"
        placeholder="enter username"
        value={props.username}
        onChange={(event) => props.setUsername(event.target.value)}
        required={true}
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default EnterUsername;
