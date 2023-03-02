import React from "react";

interface Props {
  user: { id: string; username: string };
}

const UserItem: React.FC<Props> = (props) => {
  return (
    <li className="connected-user">
      <img src="/assets/user.png" alt="Unknown User" />
      <span>{props.user.username}</span>
    </li>
  );
};

export default UserItem;
