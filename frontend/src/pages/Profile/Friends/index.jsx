import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useAuth0 } from "@auth0/auth0-react";

import columnDefs from "./columns";

import { getFriends } from "../../../api/apiCalls";
import { Button } from "react-bootstrap";
import AddFriendModal from "./AddFriendModal";

const Friends = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [friends, setFriends] = useState([]);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const gridApi = useRef();

  const fetchFriends = useCallback(async () => {
    try {
      gridApi.current.api.showLoadingOverlay();
      const accessToken = await getAccessTokenSilently();
      const result = await getFriends(accessToken);
      setFriends(result.filter());
    } catch (errorResponse) {
      setFriends([]);
      toast.error(
        "There was a problem getting your friends list. Try again later"
      );
    }
  }, [getAccessTokenSilently]);

  return (
    <div className="mt-4">
      <h2>Friends</h2>

      <div className="ag-theme-alpine my-3">
        <AgGridReact
          ref={gridApi}
          rowData={friends}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onGridReady={fetchFriends}
          onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
          suppressRowClickSelection
          suppressRowHoverHighlight
        />
      </div>

      <Button onClick={() => setShowAddFriendModal(true)}>Add Friend</Button>

      {showAddFriendModal && (
        <AddFriendModal
          onHide={() => setShowAddFriendModal(false)}
          show={showAddFriendModal}
        />
      )}
    </div>
  );
};

export default Friends;
