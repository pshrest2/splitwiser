import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (isAuthenticated && !user.email_verified)
    return <Navigate to="/verify-email" replace />;
  return children;
};

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
