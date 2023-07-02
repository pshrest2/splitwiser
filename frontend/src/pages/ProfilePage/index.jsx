import { useCallback, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

import BackgroundContainer from "../../components/BackgroundContainer";
import { getUser, updateUser } from "../../api/apiCalls";
import useAccessToken from "../../hooks/useAccessToken";

const ProfilePage = () => {
  const { user: auth0_user, getAccessTokenSilently } = useAuth0();
  const accessToken = useAccessToken();
  const [editUser, setEditUser] = useState(false);
  const [user, setUser] = useState(auth0_user);

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await updateUser(user.sub, user, accessToken);
      if (result.error)
        toast.error("There was an error updating user. Please try again later");
      else {
        toast.success(result.message);
        setEditUser(false);
      }
    },
    [accessToken, getAccessTokenSilently, user]
  );

  const loadUser = useCallback(async () => {
    const currUser = await getUser(auth0_user.sub, accessToken);
    setUser(currUser);
  }, [accessToken, auth0_user.sub]);

  const handleFieldChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(auth0_user);

  // useEffect(() => {
  //   if (accessToken) loadUser();
  // }, [accessToken, loadUser]);

  return (
    <BackgroundContainer>
      {user && (
        <div className="d-flex">
          <div className="mr-3">
            <Image src={user.picture} alt="profile-picture" />
          </div>
          <div className="d-flex flex-column">
            {!editUser ? (
              <div className="w-100 mx-5">
                <h1>{user.name}</h1>
                <h6>{user.email}</h6>
              </div>
            ) : (
              <Form className="w-100 mx-5" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleFieldChange}
                    placeholder="Enter your full name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    className="mx-1"
                    onClick={() => setEditUser(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            )}
          </div>
          {!editUser && (
            <div>
              <Button variant="link" onClick={() => setEditUser(true)}>
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </BackgroundContainer>
  );
};

export default ProfilePage;
