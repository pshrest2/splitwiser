import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";

const PlaidLink = ({ token, setLinkSuccess }) => {
  const onSuccess = useCallback(async (public_token) => {
    // set the access token in the server by passing the public token
    const response = await fetch("/api/v1/plaid/set_access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_token }),
    });
    if (!response.ok) {
      console.log("Something went wrong while setting the access token");
      return;
    }
    setLinkSuccess(true);
  }, []);

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
