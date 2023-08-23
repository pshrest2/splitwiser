import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import BackgroundContainer from "../../components/BackgroundContainer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const onClick = () => {
    if (isAuthenticated) navigate("/profile");
    else loginWithRedirect();
  };
  return (
    <BackgroundContainer className="home-page">
      <Button className="my-5 mx-auto" onClick={onClick}>
        Get Started
      </Button>
    </BackgroundContainer>
  );
};

export default HomePage;
