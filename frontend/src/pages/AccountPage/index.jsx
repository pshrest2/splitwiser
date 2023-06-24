import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import PlaidLink from "../../components/PlaidLink";
import BackgroundContainer from "../../components/BackgroundContainer";
import useAccessToken from "../../hooks/useAccessToken";

const AccountPage = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accountLinked, setAccountLinked] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { accessToken } = useAccessToken();
  const generateLinkToken = useCallback(async () => {
    // Link tokens or 'payment_initiation' use a different creation flow in your backend.
    const response = await fetch("/api/v1/plaid/create_link_token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    if (data) {
      if (data.error) {
        setLinkToken(null);
        toast.error(data.error);
      } else {
        setLinkToken(data.link_token);
      }
    }
    // Save the link_token to be used later in the Oauth flow.
    localStorage.setItem("link_token", data.link_token);
  }, [accessToken]);

  const verifyAccountLinked = useCallback(async () => {
    const response = await fetch("/api/v1/plaid", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();

    if (data) {
      if (data.error) toast.error("Something went wrong");
      if (data.account_linked) setAccountLinked(true);
      else {
        setAccountLinked(false);
        await generateLinkToken();
      }
    }
  }, [accessToken, generateLinkToken]);

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
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

  useEffect(() => {
    if (accessToken) verifyAccountLinked();
  }, [accessToken, verifyAccountLinked]);

  return (
    <BackgroundContainer className="home-page">
      <div className="mt-5 d-flex flex-column">
        <>
          {!accountLinked && linkToken && (
            <PlaidLink token={linkToken} setAccountLinked={setAccountLinked} />
          )}

          {accountLinked && (
            <Button onClick={getLatestTransactions} disabled={isLoading}>
              GET Transactions
            </Button>
          )}

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
        </>
      </div>
    </BackgroundContainer>
  );
};

export default AccountPage;
