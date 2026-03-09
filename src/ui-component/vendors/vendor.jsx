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

          <Typography variant="h5" fontWeight="bold">
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
            background: "#ff8c00",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            "&:hover": { background: "#ff7700" }
          }}
        >
          Add Vendor
        </Button>

      </Stack>

      {/* SEARCH */}

      <TextField
        placeholder="Search vendors..."
        fullWidth
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
              background: "#0d0c0c"
            }}
          >

            <TableRow>

              <TableCell><b>Vendor</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>Events</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {vendors?.length === 0 ? (

              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Vendors Found
                </TableCell>
              </TableRow>

            ) : (

              vendors?.map((vendor, index) => (

                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      background: "#100f0f"
                    }
                  }}
                >

                  <TableCell>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          bgcolor: "#ff8c00",
                          width: 36,
                          height: 36,
                          fontWeight: "bold"
                        }}
                      >
                        {vendor.vendorName?.charAt(0).toUpperCase()}
                      </Avatar>

                      <Typography fontWeight="500">
                        {vendor.vendorName}
                      </Typography>

                    </Stack>

                  </TableCell>

                  <TableCell>{vendor.vendorEmail}</TableCell>

                  <TableCell>{vendor.city}</TableCell>

                  <TableCell>{vendor.events || 0}</TableCell>

                  <TableCell>

                    <Chip
                      label={vendor.status || "Active"}
                      size="small"
                      sx={{
                        fontWeight: "bold"
                      }}
                      color={vendor.status === "Inactive" ? "error" : "success"}
                    />

                  </TableCell>

                  <TableCell>

                    <IconButton>
                      <MoreHorizIcon />
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
            background: "#fafafa"
          }}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >

            <Typography variant="h6" fontWeight="bold">
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
              label="Events"
              name="events"
              type="number"
              value={formData.events}
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
                background: "#ff8c00",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                height: 45,
                "&:hover": { background: "#ff7700" }
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