import { ACCOUNT_STATUSES } from "../../../../helpers/enums";
import ActiveActions from "./ActiveActions";
import ExpiredActions from "./ExpiredActions";

const Actions = ({ value: { account, refresh } }) => {
  switch (account.status) {
    case ACCOUNT_STATUSES.active:
      return <ActiveActions account={account} refresh={refresh} />;
    case ACCOUNT_STATUSES.expired:
      return <ExpiredActions />;
    default:
      return null;
  }
};

export default Actions;
