import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TrainingResponse } from '../../db/constants';
import { IconButton } from '@mui/material';

export const CalendarEventComponent = ({ training }: { training?: TrainingResponse }) => {
  const onDelete = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('delete');
  };
  const onEdit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('edit');
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // zIndex: 9999,
      }}
    >
      <h4 style={{ fontSize: 10 }}>{training?.name}</h4>
      <div style={{ display: 'flex' }}>
        <IconButton onClick={onDelete}>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
};
