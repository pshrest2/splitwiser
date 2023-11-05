import { useCallback, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../api/apiCalls";

const UserDetail = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userInfo = await getUserById(userId, accessToken);
      setUser(userInfo);
    } catch (e) {
      if (e.status === 404) navigate("/not-found");
      else toast.error(e.error);
    }
  }, [getAccessTokenSilently, navigate, userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) return;
  return (
    <div className="d-flex">
      <div className="mr-3">
        <Image src={user.picture} alt="profile-picture" />
      </div>
      <div className="d-flex flex-column">
        <div className="w-100 mx-5">
          <h1>{user.name}</h1>
          <h6>{user.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
