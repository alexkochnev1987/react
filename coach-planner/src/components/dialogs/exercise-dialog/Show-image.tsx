import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { UploadFile } from './Upload-file';
import { updateExercise, uploadImg } from '../../../db/exercises';

export const ShowImage = ({ idExercise }: { idExercise: string }) => {
  const [loadImage, setLoadImage] = useState(false);
  const loadFile = async (file: File) => {
    setLoadImage(true);
    const img = await uploadImg(file, idExercise);
    await updateExercise(idExercise, { img });
    setLoadImage(false);
  };

  return (
    <Box display={'flex'} width={'100%'} gap={1}>
      {loadImage ? (
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <UploadFile loadFile={loadFile} />
        </div>
      )}
    </Box>
  );
};
