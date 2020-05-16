import { AuthContext } from "../App";
import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
function useLoginStatus() {
  const { updateLoginStatus } = useContext(AuthContext);

  const handleLogoutClick = () => {
    updateLoginStatus(false);
    // TokenService.clearAuthToken()
  };

  const renderLogoutLink = () => (
    <div className="Nav__logged-in">
      <Link onClick={handleLogoutClick} to="/">
        Logout
      </Link>
    </div>
  );

  const renderLoginLink = () => (
    <div className="Nav__not-logged-in">
      <Link to="/register">Register</Link>

      <Link to="/login">Log in</Link>
    </div>
  );

  return {
    // TokenService.hasAuthToken()
    isLoggedIn: true,
    loggedInRender: renderLoginLink,
    loggedOutRender: renderLogoutLink,
  };
}

export default useLoginStatus;
