import * as React from 'react';
import { type Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { updateExercise } from '../../db/exercises';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ExerciseResponseKeys } from '../../db/constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[] | undefined, theme: Theme) {
  return {
    fontWeight:
      personName && personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface EditTagProps {
  idExercise: string;
  fieldName: ExerciseResponseKeys;
  value: string[] | undefined;
  label: string;
  options: string[];
}

export function MultipleSelectChip({ idExercise, fieldName, value, label, options }: EditTagProps) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState(value || []);
  const handleCancel = () => {
    setSelectValue(value || []);
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    updateExercise(idExercise, { [fieldName]: selectValue });
  };

  const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
    setIsEditing(true);
    const {
      target: { value },
    } = event;
    setSelectValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box display="flex">
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={selectValue}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, selectValue, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isEditing && (
        <Box>
          <IconButton onClick={handleSave} sx={{ padding: 0 }}>
            <CheckCircleIcon color="success" />
          </IconButton>
          <IconButton onClick={handleCancel} sx={{ padding: 0 }}>
            <CancelIcon color="error" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
