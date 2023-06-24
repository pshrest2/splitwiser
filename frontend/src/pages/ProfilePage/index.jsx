import { useAuth0 } from "@auth0/auth0-react";
import useAccessToken from "../../hooks/useAccessToken";
import { useCallback, useEffect } from "react";

const ProfilePage = () => {
  const { user } = useAuth0();
  const { accessToken } = useAccessToken();

  const createUser = useCallback(async () => {
    await fetch(`/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth0_id: user.sub,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
      }),
    });
  }, [accessToken, user]);

  const getCurrentUser = useCallback(async () => {
    const response = await fetch(`/api/v1/users/${user.sub}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) return;
    const currUser = await response.json();

    if (!currUser) {
      await createUser();
    }
  }, [accessToken, createUser, user.sub]);

  useEffect(() => {
    if (accessToken) getCurrentUser();
  }, [accessToken, getCurrentUser]);

  return <div>Profile Page</div>;
};

export default ProfilePage;
