import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";

import "./App.scss";
import RequireAuth from "./components/RequireAuth";
import AccountPage from "./pages/AccountPage";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const saveTokenToRedux = useCallback(async () => {
    if (isAuthenticated && !accessToken) {
      localStorage.setItem("accessToken", await getAccessTokenSilently());
    }
  }, [accessToken, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    saveTokenToRedux();
  }, [isAuthenticated, getAccessTokenSilently, dispatch, saveTokenToRedux]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
