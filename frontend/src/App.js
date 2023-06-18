import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import PlaidLink from "./components/PlaidLink";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

import "./App.scss";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [config, setConfig] = useState({
    linkToken: null,
    linkTokenError: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

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

  const formatCurrency = (number, code) => {
    if (number != null && number !== undefined) {
      return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
    }
    return "no data";
  };

  const getLatestTransactions = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/v1/plaid/transactions`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.error != null) {
      toast.error(data.error);
      setIsLoading(false);
      return;
    }

    setTransactions(
      data.latest_transactions?.map((t) => ({
        name: t.name,
        amount: formatCurrency(t.amount, t.iso_currency_code),
        date: t.date,
      })) || []
    );
    toast.success("Successfully fetched transactions");
    setIsLoading(false);
  };

  const securedApiCall = async () => {
    const token = await getAccessTokenSilently();
    await fetch("/api/v1/test", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);
  return (
    <div className="App">
      <div className="d-flex flex-column">
        <PlaidLink token={config.linkToken} />

        <Button onClick={getLatestTransactions} disabled={isLoading}>
          GET Transactions
        </Button>
        {transactions.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>{t.amount}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <>
          <LogoutButton />
          <Button variant="success" onClick={securedApiCall}>
            Make Api Call
          </Button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
