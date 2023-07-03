import { useState, useCallback, useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faReceipt } from "@fortawesome/free-solid-svg-icons";

import TransactionsModal from "../TransactionsModal";

import {
  createUserAccount,
  deleteUserAccount,
  getTransactions,
  getUserAccounts,
} from "../../../api/apiCalls";
import PlaidLink from "../../../components/PlaidLink";
import { ACCOUNT_STATUSES } from "../../../helpers/enums";
import Actions from "./Actions";

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("MMMM DD, YYYY hh:mm A");
};

const bgColorFromStatus = (status) => {
  switch (status) {
    case ACCOUNT_STATUSES.active:
      return "success";
    case ACCOUNT_STATUSES.expired:
      return "danger";
    default:
      return "warning";
  }
};

const initialTransactionInfo = {
  show: false,
  account: {},
  transactions: [],
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
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{formatDateTime(account.created_at)}</td>
              <td>{formatDateTime(account.updated_at)}</td>
              <td>
                <Badge
                  bg={bgColorFromStatus(account.status)}
                  className="fw-normal"
                  pill
                >
                  {account.status}
                </Badge>
              </td>
              <td>
                <Actions
                  account={account}
                  setTransactionInfo={setTransactionInfo}
                  resetTransactions={() =>
                    setTransactionInfo(initialTransactionInfo)
                  }
                  refresh={fetchAccounts}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PlaidLink onSuccess={onSuccess} />

      <TransactionsModal
        onHide={() => setTransactionInfo(initialTransactionInfo)}
        transactionsInfo={transactionInfo}
      />
    </div>
  );
};

export default Accounts;
