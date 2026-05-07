import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Avatar,
  Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersRequest } from "../../container/orderContainer/slice";

const Bookings = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.orders || []);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getOrdersRequest());
  }, [dispatch]);

  const capitalizeWords = (text) =>
    text ? text.replace(/\b\w/g, (c) => c.toUpperCase()) : "-";

  const filteredOrders = orders?.filter((order) =>
    order?.eventId?.eventName?.toLowerCase().includes(search.toLowerCase()) ||
    order?.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order?.vendorId?.vendorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" fontSize={"20px"}>
            Total Bookings
          </Typography>
          <Typography variant="body2" color="gray">
            {orders?.length || 0} bookings registered
          </Typography>
        </Box>
      </Stack>

      {/* SEARCH */}
      <TextField
        placeholder="Search bookings..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          maxWidth: 420,
          background: "#0b0b0b",
          borderRadius: "8px"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        <Table>
          <TableHead
            sx={{
              background: "#2b1a0f",
            }}
          >
            <TableRow>
              <TableCell><b>Event</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Vendor</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Tickets</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Bookings Found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders?.map((order, index) => (
                <TableRow key={order._id || index}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: "#fe7816",
                          width: 36,
                          height: 36,
                          color: "white",
                        }}
                      >
                        {order?.eventId?.eventName?.charAt(0).toUpperCase() || "E"}
                      </Avatar>
                      <Typography fontWeight="500">
                        {capitalizeWords(order?.eventId?.eventName)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{capitalizeWords(order?.userId?.name) || "Guest"}</TableCell>
                  <TableCell>{capitalizeWords(order?.vendorId?.vendorName)}</TableCell>
                  <TableCell>
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </TableCell>
                  <TableCell>{order?.quantity ?? "-"}</TableCell>
                  <TableCell>
                    {order?.totalAmount ? `₹${order.totalAmount}` : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Bookings;