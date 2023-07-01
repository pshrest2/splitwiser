import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import AuthCallback from "./pages/AuthCallback";

import "./App.scss";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
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
