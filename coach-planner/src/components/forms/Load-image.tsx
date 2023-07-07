import { ChangeEvent, useState } from 'react';
import { Avatar, Box, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { CustomUser, loadFileSetLink } from '../../db/user';

export const LoadImage = ({ user }: { user: CustomUser | undefined }) => {
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files) {
      const file = files[0];
      setLoading(true);
      await loadFileSetLink(user, file);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar alt="User image" src={user?.img} sx={{ width: 300, height: 300 }} />
      <Box>
        <IconButton color="primary" aria-label="upload picture" component="label" disabled={loading}>
          <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
          {loading ? <CircularProgress /> : <PhotoCamera />}
        </IconButton>
      </Box>
    </Box>
  );
};
