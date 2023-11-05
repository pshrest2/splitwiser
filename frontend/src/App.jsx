import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import Receipt from "./pages/Receipt";
import NotFound from "./pages/NotFound";

import "./styles/theme.scss";
import BackgroundContainer from "./components/BackgroundContainer";
import Callback from "./pages/Callback";
import UserDetail from "./pages/UserDetail";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <BackgroundContainer className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <RequireAuth>
                <UserDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/callback"
            element={
              <RequireAuth>
                <Callback />
              </RequireAuth>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BackgroundContainer>
    </BrowserRouter>
  );
}

export default App;
