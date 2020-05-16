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

  console.log(dispatch);

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
  return (
    <React.Fragment>
      <Link to="/">
        <li onClick={handleLogout}>Logout</li>
      </Link>
    </React.Fragment>
  );
};
export default LogoutButton;
