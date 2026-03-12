import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { TagsOutlined, DollarOutlined, TeamOutlined , CreditCardOutlined  } from '@ant-design/icons';
import Card from './card';

const AnalyticsCard = ({ totalTicketsSold, totalVendors, totalRevenue }) => {

  const facilityList = useSelector((state) => state.facility?.list || []);
  const issueList = useSelector((state) => state.reportIssue?.list || []);
  const feedbackList = useSelector((state) => state.rating?.list || []);
  const usersList = useSelector((state) => state.user?.list || []);
  const dashCount = useSelector((state) => state?.dashboard?.dashCount);
  const draftFacilities = useSelector((state) => state.facility?.draftList || []);

  const draftCount = draftFacilities.length;

  const counts = {
    facilities: useSelector((state) => state.facility?.listCount || 0),
    issues: useSelector((state) => state.reportIssue?.listCount || 0),
    feedback: useSelector((state) => state?.rating?.listCount || 0),
    users: useSelector((state) => state.user?.listCount || 0)
  };

  return (
    <Grid container item xs={12} spacing={2.5}>
      <Grid item xs={12}>
        <Grid container spacing={2.5}>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Total Ticket Sold"
              count={totalTicketsSold}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<TagsOutlined />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Total Revenue"
              count={`₹${Number(totalRevenue).toLocaleString("en-IN")}`}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<DollarOutlined />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Active Vendors"
              count={totalVendors}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<TeamOutlined  />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              title="Total Subscription"
              count={200}
              color="#d0d7e4"
              bgTheme="#000000"
              icon={<CreditCardOutlined  />}
            />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCard;