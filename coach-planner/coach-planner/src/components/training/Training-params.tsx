import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { getColorFromParams } from "../../utils/getColorFromParams";

export const TrainingParams = ({
  id,
  params,
}: {
  id: string;
  params: {
    CP: number;
    "CP+LA": number;
    LA: number;
    O2: number;
    Rest: number;
  };
}) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(params).map((x) => (
        <Grid item xs={2} key={x[0]}>
          <Box height={100} bgcolor={getColorFromParams(x[0])}>
            {x[1]}
          </Box>
        </Grid>
      ))}
      <Grid item xs={2}>
        <Box height={100}>
          {Object.values(params).reduce((prev, curr) => prev + curr, 0)}
        </Box>
      </Grid>
    </Grid>
  );
};
