import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateGroupModal = ({ show, onHide }) => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    members: [],
  });

  const changeField = (e) => {
    setGroup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createGroup = () => {};
  return (
    <Form onSubmit={createGroup}>
      <Modal show={show} onHide={onHide} size="sm">
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
