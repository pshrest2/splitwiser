import React, { useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, getUser } from "../../api/apiCalls";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { isLoading, user: auth0User, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const createNewUser = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const user = await getUser(auth0User.sub, token);

    if (!user) {
      await createUser(auth0User, token);
    }

    navigate("/profile");
  }, [getAccessTokenSilently, auth0User, navigate]);

  useEffect(() => {
    if (isLoading) return;
    createNewUser();
  }, [createNewUser, isLoading]);

  return <div>Redirecting...</div>;
};

export default Callback;
