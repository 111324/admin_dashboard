import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  MenuItem,
  Avatar,
  InputAdornment
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";

import {
  createVendorRequest,
  getVendorRequest
} from "../../container/vendorContainer/slice";

const Vendor = () => {

  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendor);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorEmail: "",
    city: "",
    events: "",
    status: "Active",
    password: ""
  });

  useEffect(() => {
    dispatch(getVendorRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    dispatch(createVendorRequest(formData));

    setFormData({
      vendorName: "",
      vendorEmail: "",
      city: "",
      events: "",
      status: "Active",
      password: ""
    });

    setOpen(false);
  };

  const filteredVendors = vendors?.filter((vendor) =>
    vendor.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
    vendor.vendorEmail?.toLowerCase().includes(search.toLowerCase()) ||
    vendor.city?.toLowerCase().includes(search.toLowerCase())
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
            Vendors
          </Typography>

          <Typography variant="body2" color="gray">
            {vendors?.length || 0} vendors registered
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            padding: "8px 18px",
            fontSize: "13px",
            boxShadow: "0 4px 14px rgba(249,115,22,0.35)"
          }}
        >
          Add Vendor
        </Button>

      </Stack>

      {/* SEARCH */}

      <TextField
        placeholder="Search vendors..."
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
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>City</b></TableCell>

              <TableCell><b>Status</b></TableCell>
              <TableCell></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredVendors?.length === 0 ? (

              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Vendors Found
                </TableCell>
              </TableRow>

            ) : (

              filteredVendors?.map((vendor, index) => (

                <TableRow
                  key={index}

                >

                  <TableCell>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          bgcolor: "#fe7816",
                          width: 36,
                          height: 36,
                          color: "white",

                        }}
                      >
                        {vendor.vendorName?.charAt(0).toUpperCase()}
                      </Avatar>

                      <Typography fontWeight="500">
                        {vendor.vendorName?.charAt(0).toUpperCase() + vendor.vendorName?.slice(1)}
                      </Typography>

                    </Stack>

                  </TableCell>

                  <TableCell>{vendor.vendorEmail}</TableCell>

                  <TableCell>{vendor.city?.charAt(0).toUpperCase() + vendor.city?.slice(1)}</TableCell>



                  <TableCell>

                    <Chip
                      label={
                        vendor.status
                          ? vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)
                          : "Active"
                      }
                      size="small"
                      sx={{
                        fontWeight: "bold"
                      }}
                      color={vendor.status === "Inactive" ? "error" : "success"}
                    />

                  </TableCell>

                  <TableCell>

                    <IconButton
                      sx={{
                        color: "#ff8c00"
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </TableContainer>

      {/* DRAWER */}

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >

        <Box
          sx={{
            width: 420,
            p: 4,
            height: "100%",
            background: "#020202"
          }}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >

            <Typography variant="h4" fontWeight="bold" fontSize={"20px"} color={"#ff7a00"}>
              Add Vendor
            </Typography>

            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>

          </Stack>

          <Stack spacing={3}>

            <TextField
              label="Vendor Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Vendor Email"
              name="vendorEmail"
              value={formData.vendorEmail}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />


            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >

              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>

            </TextField>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
                padding: "8px 18px",
                fontSize: "13px",
                boxShadow: "0 4px 14px rgba(249,115,22,0.35)"
              }}
            >
              Create Vendor
            </Button>

          </Stack>

        </Box>

      </Drawer>

    </Box>

  );
};

export default Vendor;