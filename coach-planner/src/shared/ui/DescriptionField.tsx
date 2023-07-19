import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface DescriptionFieldProps {
  label: string;
  data?: string;
  children?: ReactNode;
}

export const DescriptionField: FC<DescriptionFieldProps> = ({ label, data, children }) => {
  return (
    <Box>
      <Typography fontWeight={'bold'} component={'span'} variant="body2">
        {label}
        {': '}
      </Typography>
      <Typography component={'span'} variant="body2">
        {data}
      </Typography>
      {children}
    </Box>
  );
};
