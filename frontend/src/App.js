import { useCallback, useEffect, useState } from "react";
import PlaidLink from "./components/PlaidLink";

import "./App.scss";

function App() {
  const [config, setConfig] = useState({
    linkToken: null,
    linkTokenError: null,
  });

  const generateLinkToken = useCallback(async () => {
    // Link tokens or 'payment_initiation' use a different creation flow in your backend.
    const response = await fetch("/api/v1/plaid/create_link_token", {
      method: "POST",
    });
    if (!response.ok) return;
    const data = await response.json();
    if (data) {
      if (data.error) {
        setConfig({
          linkToken: null,
          linkTokenError: data.error,
        });
        return;
      }
      setConfig({ linkToken: data.link_token, linkTokenError: null });
    }
    // Save the link_token to be used later in the Oauth flow.
    localStorage.setItem("link_token", data.link_token);
  }, []);

  useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);
  return (
    <div className="App">
      <PlaidLink token={config.linkToken} />
    </div>
  );
}

export default App;
