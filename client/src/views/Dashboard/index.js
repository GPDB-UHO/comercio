import React from "react";
import { Grid } from "@material-ui/core";

import LatestDeliveries from "./LatestDeliveries";

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <LatestDeliveries />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
