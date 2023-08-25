import { useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useAuth0 } from "@auth0/auth0-react";

import columnDefs from "./columns";

import { createUserAccount, getUserAccounts } from "../../../api/apiCalls";
import PlaidLink from "../../../components/PlaidLink";

const Accounts = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);
  const gridApi = useRef();

  const fetchAccounts = useCallback(async () => {
    try {
      gridApi.current.api.showLoadingOverlay();
      const accessToken = await getAccessTokenSilently();
      const result = await getUserAccounts(user.sub, accessToken);
      setAccounts(result);
    } catch (errorResponse) {
      setAccounts([]);
      toast.error(
        "There was a problem getting retrieving the linked accounts. Try again later"
      );
    }
  }, [getAccessTokenSilently, user.sub]);

  const onSuccess = useCallback(
    async (public_token, metadata) => {
      const account = {
        name: metadata.institution.name,
        public_token: public_token,
      };
      const accessToken = await getAccessTokenSilently();
      const result = await createUserAccount(user.sub, account, accessToken);

      if (result.error)
        toast.error("Failed to add account. Please try again later");
      else toast.success("Account added successfully");
      await fetchAccounts();
    },
    [fetchAccounts, getAccessTokenSilently, user.sub]
  );

  return (
    <div className="mt-4">
      <h2>Linked Accounts</h2>

      <div className="ag-theme-alpine my-3">
        <AgGridReact
          ref={gridApi}
          rowData={accounts}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onGridReady={fetchAccounts}
          onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
          suppressRowClickSelection
          suppressRowHoverHighlight
        />
      </div>

      <PlaidLink onSuccess={onSuccess} />
    </div>
  );
};

export default Accounts;
