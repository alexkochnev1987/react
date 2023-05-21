import { red } from "@mui/material/colors";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
} from "@mui/material";
import { ExpandText } from "../training/ExpandText";
import { ExerciseResponse, deleteExercise } from "../../db/exercises";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { SubmitDialog } from "../dialogs/exercise-dialog/submit-dialog";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";
import { ShowImage } from "../dialogs/exercise-dialog/Show-image";
import { EditContent } from "./Edit-content";

export const deleteDialogContent = {
  title: "Вы хотите удалить упражнение",
  message: "Упражнение будет удалено безвозвратно",
  submit: "Подтвердить",
  cancel: "Отмена",
};

export const ChangeExerciseCard = ({
  exercise,
}: {
  exercise: ExerciseResponse;
}) => {
  const navigate = useNavigate();
  const [openSubmit, setOpenSubmit] = useState(false);
  const deleteMyExercise = () => {
    navigate(RouteNames.myExercises);
    deleteExercise(exercise.id);
  };
  return (
    <Card>
      <SubmitDialog
        content={deleteDialogContent}
        open={openSubmit}
        submit={deleteMyExercise}
        onClose={() => {
          setOpenSubmit(false);
        }}
      />
      <CardHeader
        title={
          <EditContent
            label={"Название упражнения"}
            idExercise={exercise.id}
            fieldName={"name"}
            value={exercise.name}
          />
        }
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
          <Button onClick={() => setOpenSubmit(true)} color="error">
            <DeleteForeverIcon />
          </Button>
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
          <Grid item xs={12} sm={6}>
            <ShowImage idExercise={exercise.id} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <EditContent
            idExercise={exercise.id}
            fieldName={"age"}
            value={exercise.age}
            label={"Возраст"}
          />
          <EditContent
            idExercise={exercise.id}
            fieldName={"description"}
            value={exercise.description}
            label={"Описание упражнения"}
          />
          {/* <ExpandText label="Description" text={exercise.description} />
          <ExpandText label="Key points" text={exercise.keyPoints} /> */}
        </Grid>
      </Grid>
    </Card>
  );
};
