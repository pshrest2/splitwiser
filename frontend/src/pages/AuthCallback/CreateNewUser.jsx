import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { createUser, getUser } from "../../api/apiCalls";
import useAccessToken from "../../hooks/useAccessToken";

const CreateNewUser = ({ children }) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const accessToken = useAccessToken();

  // move this method to a seperate component that will only run once for a newly created user
  const createNewUser = useCallback(async () => {
    const currUser = await getUser(user.sub, accessToken);
    if (currUser) {
      navigate("/");
      return;
    }

    const result = await createUser(
      {
        auth0_id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      accessToken
    );
    if (result.error)
      toast.error("Error creating user. Please try again later");
    else navigate("/");
  }, [accessToken, navigate, user.email, user.name, user.picture, user.sub]);

  useEffect(() => {
    if (accessToken) createNewUser();
  }, [accessToken, createNewUser]);

  return <div>{children}</div>;
};

export default CreateNewUser;
