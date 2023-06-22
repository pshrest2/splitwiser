import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
