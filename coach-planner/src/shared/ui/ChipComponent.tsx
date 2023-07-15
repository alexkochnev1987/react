import { Chip } from '@mui/material';
import { FC } from 'react';

interface ChipComponentProps {
  handleDelete: (key: string) => void;
  data: ChipProps;
}

export interface ChipProps {
  value: string;
  id: string;
}

export const ChipComponent: FC<ChipComponentProps> = ({ data, handleDelete }) => {
  return <Chip label={data.value} onDelete={() => handleDelete(data.id)} />;
};
