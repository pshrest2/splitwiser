import { useAuth0 } from "@auth0/auth0-react";

const useAccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    accessToken = getAccessTokenSilently();
    localStorage.setItem("accessToken", accessToken);
  }
  return { accessToken };
};

export default useAccessToken;
