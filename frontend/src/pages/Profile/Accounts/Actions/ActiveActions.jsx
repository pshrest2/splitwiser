import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { faReceipt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TransactionsModal from "./TransactionsModal";

import { deleteUserAccount } from "../../../../api/apiCalls";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ActiveActions = ({ account }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const deleteAccount = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await deleteUserAccount(account.id, accessToken);
      window.location.reload();
    } catch (errorResponse) {
      toast.error(errorResponse.error.message);
    } finally {
      setShowConfirmDelete(false);
    }
  }, [account.id, getAccessTokenSilently]);

  return (
    <>
      <Button variant="link" onClick={() => setShowTransactions(true)}>
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
        show={showTransactions}
        onHide={() => setShowTransactions(false)}
        account={account}
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
