import React from 'react';
import { IconButton } from '@mui/material';

export const IconButtonForTool = ({
  src,
  onClick,
  children,
  color,
  isActive,
}: {
  isActive: boolean;
  src?: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onClick: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <IconButton
      onClick={() => onClick()}
      color={color ? color : 'default'}
      sx={{
        border: isActive ? '2px solid' : 'none',
      }}
    >
      {src && <img src={src} alt="" width={25} height={20} />}
      {children}
    </IconButton>
  );
};
