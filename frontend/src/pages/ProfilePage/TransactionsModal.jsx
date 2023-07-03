import { Button, Modal, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const TransactionsModal = (props) => {
  const {
    onHide,
    transactionsInfo: { show, transactions, account },
  } = props;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Transactions for {account.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 &&
              [1, 2, 3].map((i) => (
                <tr key={i}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              ))}
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
