import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";
import { toast } from "react-toastify";

const PlaidLink = ({ token, setAccountLinked }) => {
  const { getAccessTokenSilently } = useAuth0();

  const onSuccess = useCallback(
    async (public_token) => {
      // set the access token in the server by passing the public token
      const token = await getAccessTokenSilently();
      const response = await fetch("/api/v1/plaid/set_access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ public_token }),
      });
      if (!response.ok) {
        toast.error("Something went wrong while linking account");
        return;
      }
      setAccountLinked(true);
    },
    [getAccessTokenSilently, setAccountLinked]
  );

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
