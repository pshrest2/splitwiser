import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

const useAccessToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const loadAccessToken = useCallback(async () => {
    const token = await getAccessTokenSilently();
    setAccessToken(token);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) loadAccessToken();
  }, [loadAccessToken, isAuthenticated]);

  return accessToken;
};

export default useAccessToken;
