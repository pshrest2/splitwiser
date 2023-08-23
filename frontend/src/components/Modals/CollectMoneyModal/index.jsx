import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import CustomButton from "../../Common/CustomButton";
import PropTypes from "prop-types";
import { useEffect } from "react";

const CollectMoneyModal = ({ show, handleClose }) => {
  const data = useSelector((state) => state.receipt);
  const { columnsData, people, receiptData } = data;
  const [personTotal, setPersonTotal] = useState([]);

  const getTotal = (items, totalPeople) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    return Math.round((total / totalPeople) * 100) / 100;
  };

  const handleRequestUser = ({ value, total }) => {
    window.open(
      `https://venmo.com/?txn=charge&audience=public&recipients=${value}&amount=${total}&note=From%Scannly`,
      "_blank"
    );
  };

  const handleSendUser = ({ value, total }) => {
    window.open(
      `https://venmo.com/?txn=pay&audience=public&recipients=${value}&amount=${total}&note=From%Scannly`,
      "_blank"
    );
  };

  useEffect(() => {
    const getTotalForEach = () => {
      let eachTotal = [];

      people.forEach((person) => {
        let total = 0;
        Object.values(columnsData.columns).forEach((column) => {
          let items = [];
          if (column.splitBetween.some((p) => p.value === person.value)) {
            column.itemIds.forEach((itemId) => {
              const item = receiptData.items.find((i) => i.id === itemId);
              items.push(item);
            });
            total += getTotal(items, column.splitBetween.length);
          }
        });
        if (total > 0)
          eachTotal.push({
            label: person.label,
            value: person.value,
            total,
          });
      });
      return eachTotal;
    };

    setPersonTotal(getTotalForEach());
  }, [people, columnsData, receiptData]);

  return (
    <Modal
      className="collect-money-modal"
      size="lg"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Now the fun part</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="collect-money-container">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {personTotal &&
                personTotal.map((person) => (
                  <tr key={person.value}>
                    <td>{person.label}</td>
                    <td>{person.value}</td>
                    <td>{person.total}</td>
                    <td>
                      <CustomButton
                        variant="success"
                        onClick={() => handleRequestUser(person)}
                        href=""
                      >
                        Request
                      </CustomButton>
                    </td>
                    <td>
                      <CustomButton onClick={() => handleSendUser(person)}>
                        Send
                      </CustomButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <CustomButton onClick={handleClose} variant="secondary">
          Cancel
        </CustomButton>
        <CustomButton variant="success" onClick={() => {}}>
          Request All
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CollectMoneyModal;

CollectMoneyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
