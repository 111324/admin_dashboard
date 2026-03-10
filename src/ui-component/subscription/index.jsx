import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";

import { adminUpsertSubscription } from "../../container/subscriptioncontainer/slice";

const AdminSubscription = () => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    vendorId: "",
    plan: "basic",
    status: "active"
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = () => {

    dispatch(
      adminUpsertSubscription({
        vendorId: form.vendorId,
        plan: form.plan,
        status: form.status
      })
    );

  };

  return (

    <Box sx={{ p: 4 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Vendor Subscription
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>

        <TextField
          fullWidth
          label="Vendor ID"
          name="vendorId"
          value={form.vendorId}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Plan"
          name="plan"
          value={form.plan}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="basic">Basic</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="enterprise">Enterprise</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Save Subscription
        </Button>

      </Paper>

    </Box>
  );
};

export default AdminSubscription;