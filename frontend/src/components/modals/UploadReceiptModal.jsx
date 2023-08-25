import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const UploadReceiptModal = ({ show, onHide }) => {
  const [form, setForm] = useState({
    receiptName: "",
    receiptImage: null,
  });
  const uploadReceipt = () => {
    console.log("NotImplementedError");
  };

  const changeImage = (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setForm({
        ...form,
        receiptImage: {
          imageSrc: x.target.result,
          imageUrl: imageFile,
          fromUrl: false,
        },
      });
    };
    reader.readAsDataURL(imageFile);
  };
  return (
    <Modal
      className="upload-receipt-modal"
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Upload your receipt`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="upload-receipt-form" onSubmit={uploadReceipt}>
          <Form.Control
            type="text"
            placeholder="Enter your receipt name"
            value={form.receiptName}
            onChange={(e) => setForm({ ...form, receiptName: e.target.value })}
            required
          />

          <input
            type="file"
            id="receipt"
            className="my-3"
            name="receipt"
            accept="image/png, image/jpeg"
            onChange={changeImage}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button type="submit">Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadReceiptModal;

UploadReceiptModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
