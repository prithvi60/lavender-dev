import React from "react";
import { Grid, Paper } from "@mui/material";

const GridPaper = (props) => {
  return (
    <Grid item xs={props?.xs ?? 12} md={props?.md ?? 12} lg={props?.lg ?? 12}>
      <Paper className="est-paper" elevation={0}>
        {props?.component}
      </Paper>
    </Grid>
  );
};

export default GridPaper;
