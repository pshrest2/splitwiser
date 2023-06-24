import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

const useAccessToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const loadAccessToken = useCallback(async () => {
    const splitwiserObject = localStorage.getItem("splitwiser");
    let currAccessToken = JSON.parse(splitwiserObject || "{}").accessToken;

    if (!currAccessToken) {
      currAccessToken = await getAccessTokenSilently();
      localStorage.setItem(
        "splitwiser",
        JSON.stringify({ accessToken: currAccessToken })
      );
    }
    setAccessToken(currAccessToken);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) loadAccessToken();
  }, [loadAccessToken, isAuthenticated]);

  return { accessToken };
};

export default useAccessToken;
