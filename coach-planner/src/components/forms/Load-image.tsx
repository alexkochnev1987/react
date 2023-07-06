import { ChangeEvent, useEffect, useState } from 'react';

import { Avatar, Box, CircularProgress, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import UploadIcon from '@mui/icons-material/Upload';
import { useDocument } from 'react-firebase-hooks/firestore';
import { updateUser, uploadImg, userDocRef } from '../../db/user';

export const LoadImage = () => {
  const [snapshot, loading, error] = useDocument(userDocRef);
  const [imageUrl, setImageUrl] = useState('');
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
      const img = await uploadImg(image);
      const userData = snapshot?.data();
      if (userData) {
        console.log(userData);

        await updateUser({ ...userData, img });
      } else {
        await updateUser({ img });
      }
    }
  };
  useEffect(() => {
    const img = snapshot?.data()?.img;
    if (img) {
      setImageUrl(img);
    }
  }, [snapshot]);

  return (
    <>
      <Avatar alt="User image" src={imageUrl} sx={{ width: 300, height: 300 }} />
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
        <PhotoCamera />
      </IconButton>
      {image && (
        <IconButton color="primary" onClick={loadFile}>
          <UploadIcon />
        </IconButton>
      )}
    </>
  );
};
//   <Container maxWidth="md" sx={{ mt: 8 }}>

/* <Stack direction="row" alignItems="center" spacing={2}> */

/* </Stack> */

/* </Container> */

//     );
//   };
