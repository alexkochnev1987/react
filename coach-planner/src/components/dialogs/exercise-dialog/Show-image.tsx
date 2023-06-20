import { Box, CardMedia, CircularProgress, Hidden } from "@mui/material";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UploadFile } from "./Upload-file";
import {
  UpdateExerciseBody,
  updateExercise,
  uploadImg,
} from "../../../db/exercises";

export const ShowImage = ({
  setValue,
  idExercise,
}: {
  setValue?: UseFormSetValue<UpdateExerciseBody>;
  idExercise: string;
}) => {
  const [loadImage, setLoadImage] = useState(false);
  const loadFile = async (file: File) => {
    setLoadImage(true);
    const img = await uploadImg(file, idExercise);
    console.log(idExercise);

    await updateExercise(idExercise, { img });
    setLoadImage(false);
  };

  return (
    <Box display={"flex"} width={"100%"} gap={1}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <UploadFile loadFile={loadFile} />
        </div>
      )}
      {/* {loadImage ? (
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
      )} */}
    </Box>
  );
};
