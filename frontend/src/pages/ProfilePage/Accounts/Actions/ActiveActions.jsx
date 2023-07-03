import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteUserAccount } from "../../../../api/apiCalls";

const ActiveActions = ({ account, refresh }) => {
  const { user, getAccessTokenSilently } = useAuth0();

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
