import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { getTransactions } from "../../../../api/apiCalls";

const defaultColDef = {
  sortable: true,
  resizable: true,
  suppressMovable: true,
};

const columnDefs = [
  {
    field: "name",
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },
  {
    field: "amount",
  },
  {
    field: "date",
  },
];

const formatCurrency = (number, code) => {
  if (!number) return "no data";
  return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
};

const TransactionsModal = ({ show, onHide, account }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(
    async ({ api }) => {
      try {
        api.showLoadingOverlay();
        const accessToken = await getAccessTokenSilently();
        const result = await getTransactions(user.sub, account.id, accessToken);

        setTransactions(
          result.latest_transactions?.map((t) => ({
            name: t.name,
            amount: formatCurrency(t.amount, t.iso_currency_code),
            date: t.date,
          })) || []
        );
      } catch (errorResponse) {
        toast.error(errorResponse.error);
        setTransactions([]);
      }
    },
    [account.id, getAccessTokenSilently, user.sub]
  );

  const closeModal = () => {
    setTransactions([]);
    onHide();
  };

  return (
    <Modal show={show} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Transactions for {account.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={transactions}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={fetchTransactions}
            onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
            isRowSelectable={() => true}
            domLayout="autoHeight"
            rowSelection="multiple"
            suppressCellFocus
            rowMultiSelectWithClick
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button>Split</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionsModal;
