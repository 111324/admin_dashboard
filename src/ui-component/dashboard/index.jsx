import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import AnalyticsCard from './AnalyticsCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from "axios";
import { useSelector } from 'react-redux';

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const [limit] = useState(5);
  const [page] = useState(0);
  const userData = useSelector((state) => state?.login?.userData || {});

  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]); // ✅ NEW


  const name =
    userData?.name
      ? userData.name.replace(/\b\w/g, (c) => c.toUpperCase())
      : "User";

  useEffect(() => {

    const fetchOrders = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/all-orders",
          { withCredentials: true }
        );

        setOrders(res.data.orders || []);

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // ✅ Fetch Vendors
    const fetchVendors = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/vendors"
        );

        console.log("Vendors API:", res.data);

        setVendors(res.data.vendors || []);

      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchOrders();
    fetchVendors();

  }, [dispatch, limit, page]);

  // Total tickets sold
  const totalTicketsSold = (orders || []).reduce((sum, order) => {
    return sum + (order.quantity || 0);
  }, 0);

  // ✅ Total Revenue from orders
  const totalRevenue = (orders || []).reduce((sum, order) => {
    return sum + (order.totalAmount || 0);
  }, 0);

  // ✅ Vendor count
  const totalVendors = vendors.length;

  return (
    <MainCard sx={{ boxShadow: 'none' }}>
      <Box>
        <Box
          sx={{
            p: 1.5,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#090a0a',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                background: '#fe7816',
                color: '#fff',
                borderRadius: '50%',
                height: 40,
                width: 40,
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}
            >
              <UserOutlined />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Platform Admin Dashboard
              </Typography>

              <Typography sx={{ fontSize: 13 }}>
                Hello, {name}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Analytics Cards */}
        <AnalyticsCard
          totalTicketsSold={totalTicketsSold}
          totalVendors={totalVendors}
          totalRevenue={totalRevenue}   // ✅ added revenue
        />

      </Box>
    </MainCard>
  );
};

export default DashboardDefault;