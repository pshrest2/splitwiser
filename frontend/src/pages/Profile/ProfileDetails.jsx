import { useCallback, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

import { getUser, updateUser } from "../../api/apiCalls";

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editUser, setEditUser] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const accessToken = await getAccessTokenSilently();
        await updateUser(user, accessToken);
        toast.success("User updated successfully");
        setEditUser(false);
      } catch (err) {
        toast.error(err.error);
      }
    },
    [getAccessTokenSilently, user]
  );

  const handleFieldChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userInfo = await getUser(accessToken);
      setUser(userInfo);
    } catch (e) {
      toast.error(e.error);
    }
  }, [getAccessTokenSilently]);

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
        {!editUser ? (
          <div className="w-100 mx-5">
            <h1>{user.name}</h1>
            <h6>{user.email}</h6>
          </div>
        ) : (
          <Form className="w-100 mx-5" onSubmit={handleUserUpdate}>
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
  );
};

export default Profile;
