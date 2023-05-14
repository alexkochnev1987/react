import { Box, CardMedia, CircularProgress, Hidden } from "@mui/material";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UploadFile } from "./Upload-file";
import { UpdateExerciseBody, uploadImg } from "../../../db/exercises";
import { BoxFlexColumn } from "../../styled/Box-d-flex";

export const ShowImage = ({
  setValue,
  idExercise,
  exerciseImage,
}: {
  setValue: UseFormSetValue<UpdateExerciseBody>;
  idExercise: string;
  exerciseImage: string | undefined;
}) => {
  const [image, setImage] = useState(exerciseImage);
  const [loadImage, setLoadImage] = useState(false);
  const loadFile = (file: File) => {
    setLoadImage(true);
    uploadImg(file, idExercise)
      .then((img) => {
        setImage(img);
        setValue("img", img);
      })
      .finally(() => setLoadImage(false));
  };

  return (
    <BoxFlexColumn width={"100%"} gap={1}>
      {loadImage ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        image && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            <img src={image} alt="exercise image" style={{ width: "100%" }} />
          </Box>
        )
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadFile loadFile={loadFile} />
      </div>
    </BoxFlexColumn>
  );
};
