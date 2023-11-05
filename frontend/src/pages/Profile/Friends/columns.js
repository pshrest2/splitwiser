import Actions from "./Actions";

const columnDefs = [
  {
    field: "name",
    sortable: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    field: "email",
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
