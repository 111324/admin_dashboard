import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Chip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersRequest } from "../../container/orderContainer/slice";

const Bookings = () => {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order?.orders || []);

  useEffect(() => {
    dispatch(getOrdersRequest());
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1
    },
    {
      field: "event",
      headerName: "Event",
      flex: 2,
      valueGetter: (params) =>
        params?.row?.eventId?.eventName || "N/A"
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 2,
      valueGetter: (params) =>
        params?.row?.userId?.name || "N/A"
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 2,
      valueGetter: (params) =>
        params?.row?.vendorId?.vendorName || "N/A"
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1.5,
      valueGetter: (params) =>
        params?.row?.createdAt
          ? new Date(params.row.createdAt).toLocaleDateString()
          : "N/A"
    },
    {
      field: "tickets",
      headerName: "Tickets",
      flex: 1,
      valueGetter: (params) => params?.row?.quantity || 0
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueGetter: (params) =>
        params?.row?.totalAmount
          ? `₹${params.row.totalAmount}`
          : "₹0"
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params?.row?.orderStatus || "Pending"}
          color={
            params?.row?.orderStatus === "Confirmed"
              ? "success"
              : params?.row?.orderStatus === "Pending"
              ? "warning"
              : "error"
          }
        />
      )
    }
  ];

  return (
    <Box p={3}>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Total Bookings
      </Typography>

      {/* Summary Cards */}

      <Grid container spacing={2} mb={3}>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">
              Total Bookings
            </Typography>
            <Typography variant="h6">
              {orders.length}
            </Typography>
          </Card>
        </Grid>

      </Grid>

      {/* Table */}

      <Box
        sx={{
          height: 500,
          background: "#1e1e2f",
          borderRadius: 2
        }}
      >

        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            }
          }}
        />

      </Box>

    </Box>
  );
};

export default Bookings;