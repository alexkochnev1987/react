import { ChangeEvent, useState } from 'react';

import { Avatar, Box, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import { CustomUser, loadFileSetLink } from '../../db/user';

export const LoadImage = ({ user }: { user: CustomUser | undefined }) => {
  const [imageUrl, setImageUrl] = useState(() => (user?.img ? user?.img : ''));
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files) {
      const file = files[0];
      setImage(file);
      const src = window.URL.createObjectURL(file);
      setImageUrl(src);
    }
  };
  const loadFile = async () => {
    if (image) {
      setLoading(true);
      await loadFileSetLink(user, image);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar alt="User image" src={imageUrl} sx={{ width: 300, height: 300 }} />
      <Box>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
          <PhotoCamera />
        </IconButton>

        <IconButton color="primary" onClick={loadFile} disabled={!image || loading}>
          {loading ? <CircularProgress /> : <UploadIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};
