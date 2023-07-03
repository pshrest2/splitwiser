import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { faReceipt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TransactionsModal from "./TransactionsModal";

import { deleteUserAccount, getTransactions } from "../../../../api/apiCalls";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const formatCurrency = (number, code) => {
  if (!number) return "no data";
  return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
};

const initialTransactionInfo = {
  show: false,
  account: {},
  transactions: [],
};

const ActiveActions = ({ account }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [transactionInfo, setTransactionInfo] = useState(
    initialTransactionInfo
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
        setTransactionInfo(initialTransactionInfo);
      }
    },
    [getAccessTokenSilently, setTransactionInfo, user.sub]
  );

  const deleteAccount = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await deleteUserAccount(user.sub, account.id, accessToken);
      window.location.reload();
    } catch (errorResponse) {
      toast.error(errorResponse.error.message);
    } finally {
      setShowConfirmDelete(false);
    }
  }, [account.id, getAccessTokenSilently, user.sub]);

  return (
    <>
      <Button variant="link" onClick={() => fetchTransactions(account)}>
        <FontAwesomeIcon icon={faReceipt} />
      </Button>
      <Button
        className="text-danger"
        variant="link"
        onClick={() => setShowConfirmDelete(true)}
      >
        <FontAwesomeIcon as={Button} icon={faTrash} />
      </Button>

      <TransactionsModal
        onHide={() => setTransactionInfo(initialTransactionInfo)}
        transactionsInfo={transactionInfo}
      />
      <ConfirmDeleteModal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        onDelete={deleteAccount}
        account={account}
      />
    </>
  );
};

export default ActiveActions;
