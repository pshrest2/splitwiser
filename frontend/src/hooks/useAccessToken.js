import { useAuth0 } from "@auth0/auth0-react";

const useAccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const setAccessToken = async () => {
    const accessToken = await getAccessTokenSilently();
    localStorage.setItem("splitwiser", JSON.stringify({ accessToken }));
    return { accessToken };
  };

  const splitwiserObject = localStorage.getItem("splitwiser");
  if (!splitwiserObject) return setAccessToken();

  let accessToken = JSON.parse(splitwiserObject).accessToken;
  if (!accessToken) return setAccessToken();

  return { accessToken };
};

export default useAccessToken;
