import { Button, Modal, Table } from "react-bootstrap";

const TransactionsModal = ({ show, onHide, transactions }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table hover striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>{t.amount}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Split</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionsModal;
