import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { addFriends, getUsers } from "../../../api/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const AddFriendModal = ({ show, onHide }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await getUsers(token);
      setUsers(
        result
          .filter((u) => u.sub !== user.sub)
          .map((u) => ({ label: u.name, value: u.id }))
      );
    } catch (err) {
      setUsers([]);
      toast.error(err.error);
    }
  }, [getAccessTokenSilently, user.sub]);

  const handleChange = (currUsers) => {
    setSelectedUserIds(currUsers.map((u) => u.value));
  };

  const sendFriendRequests = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      await addFriends(
        {
          friendship: {
            friend_id: selectedUserIds,
          },
        },
        token
      );
      toast.success("Friend request sent successfully");
    } catch (err) {
      toast.error(err.error);
    }
  }, [getAccessTokenSilently, selectedUserIds]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Send Friend Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          options={users}
          onChange={handleChange}
          isSearchable={true}
          placeholder="Type to search splitwisers..."
          noOptionsMessage={() => "No users found"}
          isMulti
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button onClick={sendFriendRequests}>Send Requests</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFriendModal;
