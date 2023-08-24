import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Unauthorized from "./pages/Unauthorized";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
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
