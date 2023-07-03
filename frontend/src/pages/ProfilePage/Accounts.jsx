import { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  createUserAccount,
  getTransactions,
  getUserAccounts,
} from "../../api/apiCalls";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import PlaidLink from "../../components/PlaidLink";
import TransactionsModal from "./TransactionsModal";

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("MMMM DD, YYYY hh:mm A");
};

const formatCurrency = (number, code) => {
  if (!number) return "no data";
  return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
};

const Accounts = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);

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

  const fetchTransactions = useCallback(
    async (account) => {
      try {
        const accessToken = await getAccessTokenSilently();
        const result = await getTransactions(user.sub, account.id, accessToken);

        setShowTransactions(true);
        setTransactions(
          result.latest_transactions?.map((t) => ({
            name: t.name,
            amount: formatCurrency(t.amount, t.iso_currency_code),
            date: t.date,
          })) || []
        );
      } catch (errorResponse) {
        toast.error(errorResponse.error);
      }
    },
    [getAccessTokenSilently, user.sub]
  );

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
    },
    [getAccessTokenSilently, user.sub]
  );

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="mt-4">
      <h2>Linked Accounts</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Update At</th>
            <th>Expired</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{formatDateTime(account.created_at)}</td>
              <td>{formatDateTime(account.updated_at)}</td>
              <td>{account.access_token_expired ? "Yes" : "No"}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => fetchTransactions(account)}
                >
                  Get Transactions
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PlaidLink onSuccess={onSuccess} />

      <TransactionsModal
        show={showTransactions}
        onHide={() => setShowTransactions(false)}
        transactions={transactions}
      />
    </div>
  );
};

export default Accounts;
