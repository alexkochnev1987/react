import { Box, Typography } from '@mui/material';
import React from 'react';
import { IExerciseParams } from './Training-params';
import { getColorFromParams } from '../../utils/getColorFromParams';

export const Chart = ({ params }: { params: IExerciseParams }) => {
  const total = Object.values(params).reduce((a, b) => a + b);
  const max = Math.max(...Object.values(params));

  return (
    <Box>
      {Object.entries(params).map((value) => (
        <Box display={'flex'} key={value[0]}>
          <Box width={'20%'}>
            <Typography variant="body2" textAlign={'center'}>
              {value[0]}
            </Typography>
          </Box>
          <Box width={'100%'}>
            <Box
              height={'20px'}
              key={value[0]}
              sx={{
                width: `${(value[1] / max) * 100}%`,
                backgroundColor: getColorFromParams(value[0]),
              }}
            ></Box>
          </Box>
          <Typography variant="body2" textAlign={'center'}>
            {Math.round((value[1] / total) * 100)}%
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
