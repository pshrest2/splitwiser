import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomButton from '../../Common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { addPerson } from '../../../Actions/receipt';
import './AddPersonModal.scss';

const AddPersonModal = ({ show, handleClose }) => {
  const data = useSelector((state) => state.receipt);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { personName, columnId } = data;

  const createOption = (label) => ({
    label,
    value: email,
  });

  const handleCreatePerson = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const newPerson = createOption(personName);
      dispatch(addPerson(newPerson, columnId));
    }, 1000);
    setIsLoading(false);
    handleClose();
  };

  return (
    <Modal
      className="add-person-modal"
      size="xs"
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Enter an email address for ${personName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="add-person-form" onSubmit={handleCreatePerson}>
          <Form.Control
            type="email"
            autoFocus
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="buttons-container">
            <CustomButton variant="secondary" onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton type="submit" disabled={isLoading}>
              Add
            </CustomButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPersonModal;

AddPersonModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
