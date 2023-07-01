import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import CreateNewUser from "./CreateNewUser";

const AuthCallback = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!user.email_verified)
    return (
      <div>
        Please verify your email address before continuing to Splitwiser
      </div>
    );
  return <CreateNewUser>Redirecting...</CreateNewUser>;
};

export default AuthCallback;
