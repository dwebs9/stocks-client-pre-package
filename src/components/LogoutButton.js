import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
};

export const LogoutButton = (props) => {
  const { dispatch } = React.useContext(AuthContext);

  const handleLogout = () => {
    console.log("handleLogout");
    dispatch({
      type: "LOGOUT",
    });
    if (props.isauth) {
      console.log("props.isauth is true");
      props.history.push(`/`);
    }
  };

  const liColour = {
    color: "white",
  };

  return (
    <React.Fragment>
      <Link to="/">
        <li onClick={handleLogout} style={liColour}>
          Logout
        </li>
      </Link>
    </React.Fragment>
  );
};
export default LogoutButton;
