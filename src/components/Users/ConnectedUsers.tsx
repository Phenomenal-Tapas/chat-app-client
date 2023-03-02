import React from "react";
import UserItem from "./UserItem";

interface Props {
  connectedUsers: { id: string; username: string }[];
}

const ConnectedUsers: React.FC<Props> = (props) => {
  return (
    <div className="connected-users scrollable">
      <h2>Connected Users</h2>
      <ul>
        {props.connectedUsers.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
