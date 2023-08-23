import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";

import "./QRCodeModal.scss";

const QRCodeModal = ({ show, handleClose }) => {
  return (
    <Modal className="qr-code-modal" size="sm" show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="qr-code-preview-container">
          <QRCode value="https://yellow-coast-0f148f110.2.azurestaticapps.net/" />
        </div>
      </Modal.Body>
      <Modal.Footer>Scan this QR Code in your phone</Modal.Footer>
    </Modal>
  );
};

export default QRCodeModal;

QRCodeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
