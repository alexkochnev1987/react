import { ExerciseResponse, deleteExercise } from "../db/exercises";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ExpandText } from "./training/ExpandText";
import { OpenExerciseDialog } from "./Open-exercise-dialog";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../router/routes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { SubmitDialog } from "./dialogs/exercise-dialog/submit-dialog";
import { deleteDialogContent } from "./Exercise/Change-exercise-card";
import { useState } from "react";

export const ExerciseCard = ({ exercise }: { exercise: ExerciseResponse }) => {
  // const buttonLabel = "Update exercise";
  // const deleteExercises = () => {
  //   deleteExercise(exercise.id);
  // };
  const [openSubmit, setOpenSubmit] = useState(false);
  const deleteMyExercise = () => {
    deleteExercise(exercise.id);
  };

  return (
    <Card>
      {/* <OpenExerciseDialog
        exerciseResponse={exercise}
        buttonLabel={buttonLabel}
      /> */}
      <SubmitDialog
        content={deleteDialogContent}
        open={openSubmit}
        submit={deleteMyExercise}
        onClose={() => {
          setOpenSubmit(false);
        }}
      />
      <CardHeader
        title={exercise.name}
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={exercise.coachImage}
          />
        }
        subheader={exercise.tag?.map((x) => (
          <Chip label={x} key={x} />
        ))}
        action={
          <>
            <Button onClick={() => setOpenSubmit(true)} color="error">
              <DeleteForeverIcon />
            </Button>
            <NavLink
              to={RouteNames.myExercises + "/" + exercise.id}
              style={{ textDecoration: "none" }}
            >
              <Button>
                <ModeEditOutlineIcon />
              </Button>
            </NavLink>
          </>
        }
      />
      <Grid container padding={1}>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <CardMedia
            component="img"
            width={"100%"}
            image={exercise.img}
            alt={exercise.name}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <ExpandText label="Description" text={exercise.description} />
          <ExpandText label="Key points" text={exercise.keyPoints} />
        </Grid>
      </Grid>
    </Card>
  );
};
