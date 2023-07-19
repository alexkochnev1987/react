import { FC, ReactNode, useState } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { EditContentButtons } from '@/entities/EditContentButtons';

interface EditTagProps {
  children: ReactNode;
  onSubmit: (input: string[]) => void;
  startValue: string[] | undefined;
  label: string;
  small?: boolean;
  tagOptions: string[];
}

export const EditTrainingTags: FC<EditTagProps> = ({
  tagOptions,
  children,
  onSubmit,
  startValue,
  label,
  small = true,
}) => {
  const [edit, setEdit] = useState(false);
  const [tagsValue, setTagsValue] = useState<string[]>(startValue || []);

  const onSubmitHandler = () => {
    setEdit(false);
    onSubmit(tagsValue);
  };

  const setEditFalse = () => {
    setTagsValue(startValue || []);
    setEdit(false);
  };

  const onTagsChange = (tags: string[]) => {
    setTagsValue(tags);
  };
  return (
    <Box display={'flex'} sx={{ width: '100%' }} height={35} paddingTop={1} paddingBottom={1} alignItems={'center'}>
      {edit ? (
        <EditContentButtons flex handleCancel={() => setEdit(false)} handleSave={onSubmitHandler} />
      ) : (
        <IconButton onClick={() => setEdit(true)}>
          <EditIcon sx={small ? { fontSize: '12px' } : { fontSize: '24px' }} />
        </IconButton>
      )}
      {edit ? (
        <Autocomplete
          size="small"
          fullWidth
          multiple
          freeSolo
          options={tagOptions}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          value={tagsValue}
          onChange={(e, v) => onTagsChange(v)}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      ) : (
        children
      )}
    </Box>
  );
};
