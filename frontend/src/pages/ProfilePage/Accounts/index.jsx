import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { useAuth0 } from "@auth0/auth0-react";

import columnDefs from "./columns";

import { createUserAccount, getUserAccounts } from "../../../api/apiCalls";
import PlaidLink from "../../../components/PlaidLink";

const Accounts = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    const result = await getUserAccounts(user.sub, accessToken);
    if (result.error)
      toast.error(
        "There was a problem getting retrieving the linked accounts. Try again later"
      );
    else {
      setAccounts(result);
    }
  }, [getAccessTokenSilently, user.sub]);

  const onSuccess = useCallback(
    async (public_token, metadata) => {
      console.log(public_token, metadata);
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
          rowData={accounts}
          columnDefs={columnDefs}
          rowSelection="multiple"
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
