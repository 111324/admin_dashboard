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

import { getVendorSubscriptions } from "../../container/subscriptioncontainer/slice";

const AdminSubscription = () => {
  const dispatch = useDispatch();
  const { vendors = [], loading = false } = useSelector((state) => state.subscription || {});

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getVendorSubscriptions());
  }, [dispatch]);

  const capitalizeWords = (text) =>
    text ? text.replace(/\b\w/g, (c) => c.toUpperCase()) : "-";

  const filteredVendors = vendors?.filter((vendor) =>
    vendor?.vendor?.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
    vendor?.plan?.toLowerCase().includes(search.toLowerCase()) ||
    vendor?.status?.toLowerCase().includes(search.toLowerCase())
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
            Vendor Subscriptions
          </Typography>
          <Typography variant="body2" color="gray">
            {vendors?.length || 0} subscriptions found
          </Typography>
        </Box>
      </Stack>

      {/* SEARCH */}
      <TextField
        placeholder="Search subscriptions..."
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
              <TableCell><b>Vendor</b></TableCell>
              <TableCell><b>Plan</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Renewal</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredVendors?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Subscriptions Found
                </TableCell>
              </TableRow>
            ) : (
              filteredVendors?.map((vendor) => (
                <TableRow key={vendor._id}>
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
                        {vendor?.vendor?.vendorName?.charAt(0).toUpperCase() || "V"}
                      </Avatar>
                      <Typography fontWeight="500">
                        {capitalizeWords(vendor?.vendor?.vendorName)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{capitalizeWords(vendor?.plan)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        vendor?.status
                          ? capitalizeWords(vendor.status)
                          : "Active"
                      }
                      size="small"
                      sx={{
                        fontWeight: "bold"
                      }}
                      color={
                        vendor?.status?.toLowerCase() === "inactive" || vendor?.status?.toLowerCase() === "expired"
                          ? "error"
                          : "success"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {vendor.renewalDate
                      ? new Date(vendor.renewalDate).toDateString()
                      : "N/A"}
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

export default AdminSubscription;