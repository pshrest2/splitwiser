import { Badge } from "react-bootstrap";
import { ACCOUNT_STATUSES } from "../../../helpers/enums";

const bgColorFromStatus = (status) => {
  switch (status) {
    case ACCOUNT_STATUSES.active:
      return "success";
    case ACCOUNT_STATUSES.expired:
      return "danger";
    default:
      return "warning";
  }
};

const Status = ({ value: { status } }) => {
  return (
    <Badge bg={bgColorFromStatus(status)} className="fw-normal" pill>
      {status}
    </Badge>
  );
};

export default Status;
