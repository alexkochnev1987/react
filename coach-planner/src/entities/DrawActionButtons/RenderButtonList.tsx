import { ToolIconButton } from '@/shared/ui/ToolIconButton/ui/ToolIconButton';
import { EquipmentTypes, PlayerTypes, UserActionsValues } from '@/store/slices/constants';
import { Box } from '@mui/material';
import { FC } from 'react';

interface UserActionListProps {
  arr: {
    icon: JSX.Element;
    value: UserActionsValues | PlayerTypes | EquipmentTypes;
    title?: string;
  }[];
  callback: (value: any) => void;
  data: UserActionsValues | PlayerTypes | EquipmentTypes;
}

export const RenderButtonList: FC<UserActionListProps> = ({ arr, callback, data }) => {
  return (
    <Box sx={{ display: 'flex', height: '45px', gap: '5px' }}>
      {arr.map(({ value, icon, title }) => (
        <ToolIconButton
          toolTipTitle={title}
          color="primary"
          key={value}
          onClick={() => callback(value)}
          isActive={value === data}
        >
          {icon}
        </ToolIconButton>
      ))}
    </Box>
  );
};
