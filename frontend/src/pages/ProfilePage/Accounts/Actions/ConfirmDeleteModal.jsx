import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, onHide, account, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete {account.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete your <strong>{account.name}</strong>{" "}
        account?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
