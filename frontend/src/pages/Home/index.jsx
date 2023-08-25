import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import UploadReceiptModal from "../../components/modals/UploadReceiptModal";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showUploadReceipt, setShowUploadReceipt] = useState(false);

  const navigate = useNavigate();

  const onClick = () => {
    if (isAuthenticated) navigate("/profile");
    else loginWithRedirect();
  };

  // TODO: create a single file upload modal for both QR code upload and drag/drop upload
  return (
    <div>
      {!isAuthenticated ? (
        <Button className="my-5 mx-auto" onClick={onClick}>
          Get Started
        </Button>
      ) : (
        <Button
          className="my-5 mx-auto"
          onClick={() => setShowUploadReceipt(true)}
        >
          Upload Receipt
        </Button>
      )}
      {showUploadReceipt && (
        <UploadReceiptModal
          show={showUploadReceipt}
          onHide={() => setShowUploadReceipt(false)}
        />
      )}
    </div>
  );
};

export default Home;
