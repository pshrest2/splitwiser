import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { Image } from "react-bootstrap";
import BackgroundContainer from "../../components/BackgroundContainer";
import { createUser, getUser } from "../../api/apiCalls";
import useAccessToken from "../../hooks/useAccessToken";

const ProfilePage = () => {
  const { user } = useAuth0();
  const accessToken = useAccessToken();

  const createNewUser = useCallback(async () => {
    const currUser = await getUser(user.sub, accessToken);
    if (!currUser)
      await createUser(
        {
          auth0_id: user.sub,
          name: user.name,
          email: user.email,
          phone: user.phone_number,
        },
        accessToken
      );
  }, [accessToken, user.email, user.name, user.phone_number, user.sub]);

  useEffect(() => {
    if (accessToken) createNewUser();
  }, [accessToken, createNewUser]);

  return (
    <BackgroundContainer>
      <div className="d-flex">
        <div className="mr-3">
          <Image src={user.picture} alt="profile-picture" />
        </div>
        <div className="d-flex flex-column">
          <h3>{user.name}</h3>
          {user.email}
          {user.phone_number}
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default ProfilePage;
