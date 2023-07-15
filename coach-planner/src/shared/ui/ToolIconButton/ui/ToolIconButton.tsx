import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
interface ToolIconButtonProps {
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  toolTipTitle?: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const ToolIconButton: FC<ToolIconButtonProps> = ({
  onClick,
  children,
  isActive,
  toolTipTitle,
  color = 'primary',
}) => {
  if (!toolTipTitle) {
    return (
      <IconButton
        onClick={() => onClick()}
        color={color}
        sx={{
          border: isActive ? '2px solid' : 'none',
        }}
      >
        {children}
      </IconButton>
    );
  }
  return (
    <Tooltip title={toolTipTitle} placement="top">
      <IconButton
        onClick={() => onClick()}
        color={color}
        sx={{
          border: isActive ? '2px solid' : 'none',
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
