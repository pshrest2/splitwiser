import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const onClick = () => {
    if (isAuthenticated) navigate("/profile");
    else loginWithRedirect();
  };
  return (
    <div>
      <Button className="my-5 mx-auto" onClick={onClick}>
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
