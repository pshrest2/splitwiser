import { ACCOUNT_STATUSES } from "../../../../helpers/enums";
import ActiveActions from "./ActiveActions";

const Actions = ({ value: { account } }) => {
  switch (account.status) {
    case ACCOUNT_STATUSES.active:
      return <ActiveActions account={account} />;
    case ACCOUNT_STATUSES.expired:
    default:
      return null;
  }
};

export default Actions;
