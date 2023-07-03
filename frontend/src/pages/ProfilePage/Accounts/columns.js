import Actions from "./Actions";
import CreatedAt from "./CreatedAt";
import Status from "./Status";

const columnDefs = [
  {
    headerName: "Institution Name",
    field: "name",
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
    headerName: "Status",
    cellRenderer: Status,
    valueGetter: (params) => ({
      status: params.data.status,
    }),
    comparator: (valueA, valueB) => {
      const a = valueA.status.toLowerCase();
      const b = valueB.status.toLowerCase();

      return a.localeCompare(b);
    },
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    headerName: "",
    cellRenderer: Actions,
    valueGetter: (params) => ({
      account: params.data,
      refresh: () => {},
    }),
  },
];

export default columnDefs;
