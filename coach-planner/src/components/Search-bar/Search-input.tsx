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
        <>
          {value && (
            <IconButton sx={{ p: '10px' }} onClick={onReset}>
              <CloseIcon />
            </IconButton>
          )}
          <IconButton sx={{ p: '10px' }}>
            <svg fill="currentColor" width="32" height="32" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5Zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
            </svg>
          </IconButton>
        </>
      )}
    </Box>
  );
};
