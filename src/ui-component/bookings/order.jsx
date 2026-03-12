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

const capitalizeWords = (text) =>
  text ? text.replace(/\b\w/g, (c) => c.toUpperCase()) : "-";

const columns = [
  {
    field: "event",
    headerName: "Event",
    flex: 2,
    valueGetter: (value, row) =>
      capitalizeWords(row?.eventId?.eventName)
  },
  {
    field: "customer",
    headerName: "Customer",
    flex: 2,
    valueGetter: (value, row) =>
      capitalizeWords(row?.userId?.name) || "Guest"
  },
  {
    field: "vendor",
    headerName: "Vendor",
    flex: 2,
    valueGetter: (value, row) =>
      capitalizeWords(row?.vendorId?.vendorName)
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1.5,
    valueGetter: (value, row) =>
      row?.createdAt
        ? new Date(row.createdAt).toLocaleDateString("en-IN")
        : "-"
  },
  {
    field: "tickets",
    headerName: "Tickets",
    flex: 1,
    valueGetter: (value, row) => row?.quantity ?? "-"
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    valueGetter: (value, row) =>
      row?.totalAmount ? `₹${row.totalAmount}` : "-"
  }
];
  return (
    <Box p={3}>

      <Typography
        variant="h4"
        fontWeight="bold"
        fontSize={"20px"}
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