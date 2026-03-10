import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { getVendorSubscriptions } from "../../container/subscriptioncontainer/slice";

const AdminSubscription = () => {

  const dispatch = useDispatch();

const { vendors = [], loading = false } =
  useSelector((state) => state.subscription || {});
  useEffect(() => {

    dispatch(getVendorSubscriptions());

  }, [dispatch]);

  return (

    <Box sx={{ p: 4 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Vendor Subscriptions
      </Typography>

      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Vendor</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Renewal</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {vendors?.map((vendor) => (

              <TableRow key={vendor._id}>

                <TableCell>{vendor.vendor?.vendorName}</TableCell>

                <TableCell>
                  {vendor.plan}
                </TableCell>

                <TableCell>
                  {vendor.status}
                </TableCell>

                <TableCell>
                  {vendor.renewalDate
                    ? new Date(vendor.renewalDate).toDateString()
                    : "N/A"}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

};

export default AdminSubscription;