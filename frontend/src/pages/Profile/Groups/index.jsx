import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useAuth0 } from "@auth0/auth0-react";

import columnDefs from "./columns";

import { getUserGroups } from "../../../api/apiCalls";
import { Button } from "react-bootstrap";
import CreateGroupModal from "./CreateGroupModal";

const Groups = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [groups, setGroups] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const gridApi = useRef();

  const fetchGroups = useCallback(async () => {
    try {
      gridApi.current.api.showLoadingOverlay();
      const accessToken = await getAccessTokenSilently();
      const result = await getUserGroups(accessToken);
      setGroups(result);
    } catch (errorResponse) {
      setGroups([]);
      toast.error(
        "There was a problem getting retrieving your groups. Try again later"
      );
    }
  }, [getAccessTokenSilently]);

  return (
    <div className="mt-4">
      <h2>Groups</h2>

      <div className="ag-theme-alpine my-3">
        <AgGridReact
          ref={gridApi}
          rowData={groups}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onGridReady={fetchGroups}
          onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
          suppressRowClickSelection
          suppressRowHoverHighlight
        />
      </div>

      <Button onClick={() => setShowCreateGroupModal(true)}>
        Create Group
      </Button>

      {showCreateGroupModal && (
        <CreateGroupModal
          onHide={() => setShowCreateGroupModal(false)}
          show={showCreateGroupModal}
        />
      )}
    </div>
  );
};

export default Groups;
