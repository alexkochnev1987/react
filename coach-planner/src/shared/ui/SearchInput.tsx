import { Box, CircularProgress, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent } from 'react';

interface InputProps {
  loading: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
  height?: string;
  background?: string;
}

export const SearchInput = (props: InputProps) => {
  const { loading, placeholder, value, onChange, onReset, height, background } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        textAlign: 'start',
        borderRadius: height ? height : 'auto',
        height: height ? height : 'auto',
        backgroundColor: background ? background : 'none',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase fullWidth sx={{ ml: 1, flex: 1 }} placeholder={placeholder} value={value} onChange={onChange} />

      {loading ? (
        <CircularProgress />
      ) : (
        value && (
          <IconButton sx={{ p: '10px' }} onClick={onReset}>
            <CloseIcon />
          </IconButton>
        )
      )}
    </Box>
  );
};
