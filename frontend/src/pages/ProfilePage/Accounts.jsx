import { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAccounts } from "../../api/apiCalls";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import moment from "moment";
import PlaidLink from "../../components/PlaidLink";

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("MMMM DD, YYYY hh:mm A");
};

const Accounts = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);

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

  const onSuccess = useCallback(async (public_token, metadata) => {
    console.log(public_token, metadata);
  }, []);

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
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{formatDateTime(account.created_at)}</td>
              <td>{formatDateTime(account.updated_at)}</td>
              <td>{account.access_token_expired ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PlaidLink onSuccess={onSuccess} />
    </div>
  );
};

export default Accounts;
