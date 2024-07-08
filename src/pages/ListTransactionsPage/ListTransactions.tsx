import { isMobile } from "react-device-detect";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { useContext } from "react";
import { useGetUserBrowserTheme } from "../../theme/consts";
import { testTransactions } from "./TestTransactions";
import { Box, Typography } from "@mui/material";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { Transaction } from "../../models/Transaction";
import { User } from "../../models/UserModel";

export const ListTransactions = () => {
  const categories = useCategoryContext();
  const paymentMethods = usePaymentMethodContext();
  const currentUser = useUserContext();
  const users: User[] = [
    currentUser! /*,
    new User("0", "dpeter99@gmail.com", "dpeter99"),*/,
  ];

  const columns: GridColDef<Transaction>[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      flex: 0 /*width: 100*/,
    },
    {
      field: "payee",
      headerName: "Payee",
      flex: 0,
      minWidth: isMobile ? 110 : 180,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0,
      minWidth: isMobile ? 130 : 160,
      valueGetter: (value) => categories.find((d) => d.id === value)?.name,
    },
    {
      field: "description",
      headerName: "Desc.",
      sortable: false,
      flex: 0,
      minWidth: isMobile ? 110 : 220,
      /*width: 130,*/
    },
    {
      field: "amount",
      headerName: "Amount (Ft)",
      type: "number",
      flex: 0,
      /* width: 80,*/
    },
    {
      field: "user",
      headerName: "User",
      flex: 0,
      //type: "User",
      width: 130,
      valueGetter: (value) => users.find((d) => d.userId === value)?.username,
    },
    {
      field: "isCommon",
      headerName: "Common",
      type: "boolean",
      flex: 0,
      minWidth: 130,
      /*width: 50,*/
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 0,
      minWidth: 130,
      //type: "CartType",
      /*width: 130,*/
      valueGetter: (value) => paymentMethods.find((d) => d.id === value)?.name,
    },
  ];

  //const { transactions } = useContext(TransactionContext);

  const rows = useTransactionContext();

  const theme = useGetUserBrowserTheme();

  return (
    <Box
      sx={{
        //width: isMobile || window.screen.width < 1200 ? "95%" : "80%",
        width: isMobile ? "95%" : "80%",
        margin: isMobile ? "5% auto" : "3% auto",
        "& .plus": {
          color: theme.palette.success.main,
          fontWeight: "bold",
        },
        "& .minus": {
          color: theme.palette.error.main,
          fontWeight: "bold",
        },
      }}
      //className="list--container"
    >
      <div>
        <Typography gutterBottom variant="h5" component="div">
          List Transactions
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          //autoPageSize={true} // doesn't work well with filtering
          disableColumnMenu={true}
          ignoreDiacritics={true}
          editMode="row"
          slots={{
            toolbar: GridToolbar,
          }}
          getCellClassName={(params: GridCellParams) => {
            if (params.field !== "amount" || params.value == null) {
              return "";
            }
            return params.value > 0 ? "plus" : "minus";
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            columns: {
              columnVisibilityModel: {
                // Hide columns
                id: false,
              },
            },
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};
