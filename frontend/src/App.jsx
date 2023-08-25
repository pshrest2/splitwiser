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

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <BackgroundContainer className="app">
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </BackgroundContainer>
  );
}

export default App;
