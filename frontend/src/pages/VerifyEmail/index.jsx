import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const VerifyEmail = () => {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated || user.email_verified)
    return <Navigate to="/" replace />;

  return (
    <div>Please verify your email address before continuing to Splitwiser</div>
  );
};

export default VerifyEmail;
