import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { Button } from "react-bootstrap";

const ExpiredActions = () => {
  const linkAccount = useCallback(async () => {}, []);

  return (
    <>
      <Button variant="link" onClick={linkAccount}>
        <FontAwesomeIcon icon={faRefresh} />
      </Button>
    </>
  );
};

export default ExpiredActions;
