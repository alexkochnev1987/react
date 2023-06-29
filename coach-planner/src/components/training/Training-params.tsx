import { Box, Typography } from '@mui/material';
import { getColorFromParams } from '../../utils/getColorFromParams';
export interface IExerciseParams {
  CP: number;
  'CP+LA': number;
  LA: number;
  O2: number;
  Rest: number;
}

export const TrainingParams = ({ params }: { params: IExerciseParams }) => {
  return (
    <Box display={'flex'} position={'sticky'} top={0} width={'100%'} zIndex={1051}>
      {Object.entries(params).map((x) => (
        <Box bgcolor={getColorFromParams(x[0])} flex={1} key={x[0]}>
          <Typography variant="caption" paragraph align="center">
            {x[0]}
          </Typography>
          <Typography variant="overline" paragraph align="center" m={0}>
            {x[1]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
