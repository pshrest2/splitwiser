import moment from "moment";

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("MMMM DD, YYYY hh:mm A");
};

const CreatedAt = ({ value: { createdAt } }) => {
  return <div>{formatDateTime(createdAt)}</div>;
};

export default CreatedAt;
