import { Box, CardMedia, CircularProgress, Hidden } from "@mui/material";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UploadFile } from "./Upload-file";
import {
  UpdateExerciseBody,
  updateExercise,
  uploadImg,
} from "../../../db/exercises";
import { BoxFlexColumn } from "../../styled/Box-d-flex";

export const ShowImage = ({
  setValue,
  idExercise,
}: // exerciseImage,
{
  setValue?: UseFormSetValue<UpdateExerciseBody>;
  idExercise: string;
  // exerciseImage: string | undefined;
}) => {
  // const [image, setImage] = useState(exerciseImage);
  const [loadImage, setLoadImage] = useState(false);
  const loadFile = async (file: File) => {
    setLoadImage(true);
    const img = await uploadImg(file, idExercise);
    console.log(idExercise);

    await updateExercise(idExercise, { img });

    // setImage(img);
    // console.log(img);

    // setValue("img", img);
    setLoadImage(false);
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
    </BoxFlexColumn>
  );
};
