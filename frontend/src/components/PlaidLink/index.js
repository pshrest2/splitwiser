import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";

const PlaidLink = ({ token }) => {
  const onSuccess = useCallback(() => {}, []);
  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button onClick={open} disabled={!ready}>
      Launch Link
    </Button>
  );
};

export default PlaidLink;
