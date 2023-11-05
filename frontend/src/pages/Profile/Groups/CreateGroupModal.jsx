import { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { getFriends } from "../../../api/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
const defaultFriends = [
  { value: "1", label: "Alexis Graham" },
  { value: "2", label: "Saurav Neupane" },
  { value: "3", label: "Peter Parker" },
];

const CreateGroupModal = ({ show, onHide }) => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    members: [],
  });
  const { getAccessTokenSilently } = useAuth0();
  const [friends, setFriends] = useState(defaultFriends);

  const fetchFriends = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const result = await getFriends(token);
      setFriends((prev) => [...prev, result]);
    } catch (err) {
      setFriends(defaultFriends);
      toast.error(err.error);
    }
  }, [getAccessTokenSilently]);

  const changeField = (e) => {
    setGroup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createGroup = () => {};

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);
  return (
    <Form onSubmit={createGroup}>
      <Modal show={show} onHide={onHide} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={group.name}
              placeholder="Enter group name"
              onChange={changeField}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={group.description}
              placeholder="Enter description for your group"
              onChange={changeField}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Members</Form.Label>
            <Select
              options={friends}
              placeholder="Select group members"
              isMulti
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default CreateGroupModal;
