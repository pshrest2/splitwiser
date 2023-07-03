import { useAuth0 } from "@auth0/auth0-react";
import { faReceipt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { deleteUserAccount, getTransactions } from "../../../../api/apiCalls";
import { toast } from "react-toastify";

const formatCurrency = (number, code) => {
  if (!number) return "no data";
  return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
};

const ActiveActions = ({
  setTransactionInfo,
  resetTransactions,
  account,
  refresh,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchTransactions = useCallback(
    async (account) => {
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
        // setTransactionInfo(initialTransactionInfo);
        resetTransactions();
      }
    },
    [getAccessTokenSilently, resetTransactions, setTransactionInfo, user.sub]
  );

  const deleteAccount = useCallback(
    async (id) => {
      try {
        const accessToken = await getAccessTokenSilently();
        await deleteUserAccount(user.sub, id, accessToken);
        await refresh();
      } catch (errorResponse) {
        toast.error(errorResponse.error.message);
      }
    },
    [getAccessTokenSilently, refresh, user.sub]
  );

  return (
    <>
      <Button variant="link" onClick={() => fetchTransactions(account)}>
        <FontAwesomeIcon icon={faReceipt} />
      </Button>
      <Button
        className="text-danger"
        variant="link"
        onClick={() => deleteAccount(account.id)}
      >
        <FontAwesomeIcon as={Button} icon={faTrash} />
      </Button>
    </>
  );
};

export default ActiveActions;
