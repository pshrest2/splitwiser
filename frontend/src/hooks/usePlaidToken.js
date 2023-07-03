import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { getLinkToken } from "../api/apiCalls";
import { toast } from "react-toastify";

const usePlaidToken = () => {
  const [linkToken, setLinkToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const generateLinkToken = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    const result = await getLinkToken(accessToken);

    if (result.error) {
      setLinkToken(null);
      toast.error("There was a problem while setting up plaid");
      return;
    }
    setLinkToken(result.link_token);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);

  return linkToken;
};

export default usePlaidToken;
