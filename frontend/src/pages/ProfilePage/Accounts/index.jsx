import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useAuth0 } from "@auth0/auth0-react";

import columnDefs from "./columns";

import TransactionsModal from "../TransactionsModal";

import {
  createUserAccount,
  getTransactions,
  getUserAccounts,
} from "../../../api/apiCalls";
import PlaidLink from "../../../components/PlaidLink";

const initialTransactionInfo = {
  show: false,
  account: {},
  transactions: [],
};

const formatCurrency = (number, code) => {
  if (!number) return "no data";
  return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
};

const Accounts = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);
  const [transactionInfo, setTransactionInfo] = useState(
    initialTransactionInfo
  );
  const fetchAccounts = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    const result = await getUserAccounts(user.sub, accessToken);
    if (result.error)
      toast.error(
        "There was a problem getting retrieving the linked accounts. Try again later"
      );
    else {
      setAccounts(result);
    }
  }, [getAccessTokenSilently, user.sub]);

  const onSuccess = useCallback(
    async (public_token, metadata) => {
      console.log(public_token, metadata);
      const account = {
        name: metadata.institution.name,
        public_token: public_token,
      };
      const accessToken = await getAccessTokenSilently();
      const result = await createUserAccount(user.sub, account, accessToken);

      if (result.error)
        toast.error("Failed to add account. Please try again later");
      else toast.success("Account added successfully");
      await fetchAccounts();
    },
    [fetchAccounts, getAccessTokenSilently, user.sub]
  );

  const fetchTransactions = useCallback(
    async (event) => {
      console.log(event);
      const account = event.data;
      try {
        setTransactionInfo((prev) => ({ ...prev, account, show: true }));

        const accessToken = await getAccessTokenSilently();
        const result = await getTransactions(user.sub, account.id, accessToken);

        setTransactionInfo((prev) => ({
          ...prev,
          transactions:
            result.latest_transactions?.map((t) => ({
              name: t.name,
              amount: formatCurrency(t.amount, t.iso_currency_code),
              date: t.date,
            })) || [],
        }));
      } catch (errorResponse) {
        toast.error(errorResponse.error);
        setTransactionInfo(initialTransactionInfo);
      }
    },
    [getAccessTokenSilently, setTransactionInfo, user.sub]
  );

  // useEffect(() => {
  //   fetchAccounts();
  // }, [fetchAccounts]);

  return (
    <div className="mt-4">
      <h2>Linked Accounts</h2>

      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={accounts}
          columnDefs={columnDefs}
          rowSelection="multiple"
          domLayout="autoHeight"
          onGridReady={fetchAccounts}
          onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
          onRowClicked={fetchTransactions}
          suppressCellFocus
        />
      </div>

      <PlaidLink onSuccess={onSuccess} />

      <TransactionsModal
        onHide={() => setTransactionInfo(initialTransactionInfo)}
        transactionsInfo={transactionInfo}
      />
    </div>
  );
};

export default Accounts;
