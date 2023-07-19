import { Box, Tooltip, Typography } from '@mui/material';
import { getColorFromParams } from './lib/getColorFromParams';
import { selectTip } from './lib/selectTip';

export interface IExerciseParams {
  CP: number;
  'CP+LA': number;
  LA: number;
  O2: number;
  Rest: number;
}

export const Chart = ({ params }: { params: IExerciseParams }) => {
  const total = Object.values(params).reduce((a, b) => a + b);

  return (
    <Box display={'flex'} flexDirection={'column'} sx={{ gap: '3px' }}>
      {Object.entries(params).map(([key, value]) => (
        <Tooltip title={selectTip(key)} placement="top" key={key}>
          <Box display={'flex'} sx={{ '&:hover': { transform: 'scale(1.02, 1.1)' } }}>
            <Typography variant="body2" textAlign={'start'} width={80}>
              {key}
            </Typography>
            <Box width={'100%'}>
              <Box
                height={'23px'}
                sx={{
                  width: `${(value / total) * 100}%`,
                  backgroundColor: getColorFromParams(key),
                }}
              ></Box>
            </Box>
            <Typography variant="body2" textAlign={'center'}>
              {Math.round((value / total) * 100)}%
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};
