import Actions from "./Actions";
import CreatedAt from "../../../components/CreatedAt";

const columnDefs = [
  {
    headerName: "Group Name",
    field: "name",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "Created At",
    field: "created_at",
    cellRenderer: CreatedAt,
    valueGetter: (params) => ({
      createdAt: params.data.created_at,
    }),
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({
      account: params.data,
    }),
  },
];

export default columnDefs;
