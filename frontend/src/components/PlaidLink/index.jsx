import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";
import usePlaidToken from "../../hooks/usePlaidToken";

const PlaidLink = ({ onSuccess }) => {
  const token = usePlaidToken();

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button onClick={open} disabled={!ready}>
      Link account
    </Button>
  );
};

export default PlaidLink;
