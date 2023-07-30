import { FC, useState } from 'react';
import { Autocomplete, Box, InputProps, TextField } from '@mui/material';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { EditContentButtons } from '@/entities/EditContentButtons/ui/EditContentButtons';
import { Timestamp } from 'firebase/firestore';

interface TagInputProps extends InputProps {
  defaultTags: string[];
  placeholder: string;
  tags: string | AllDrawType | string[] | undefined | Timestamp | boolean;
  callback: (x: string[]) => void;
}

export const EditTags: FC<TagInputProps> = ({ defaultTags, placeholder, tags, callback }) => {
  const baseTags = Array.isArray(tags) ? tags : ([] as string[]);
  const [isEditing, setIsEditing] = useState(false);
  const [tagsValue, setTagsValue] = useState<string[]>(baseTags);

  const handleCancel = () => {
    setTagsValue(baseTags);
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    callback(tagsValue);
  };

  const onTagsChange = (tags: string[]) => {
    setIsEditing(true);
    setTagsValue(tags);
  };
  return (
    <Box display="flex">
      <Autocomplete
        fullWidth
        multiple
        freeSolo
        options={defaultTags}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        value={tagsValue}
        onChange={(e, v) => onTagsChange(v)}
        renderInput={(params) => <TextField {...params} label={placeholder} />}
      />
      {isEditing && <EditContentButtons handleSave={handleSave} handleCancel={handleCancel} />}
    </Box>
  );
};
