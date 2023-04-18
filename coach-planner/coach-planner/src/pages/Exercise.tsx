import React, { useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Button } from "@mui/material";
import {
  createExercise,
  deleteExercise,
  exerciseCollection,
  updateExercise,
  UpdateExerciseBody,
} from "../db/exercises";

import { useCollection } from "react-firebase-hooks/firestore";
import { ExerciseDialog } from "../components/dialogs/create-exercise";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const Exercise = () => {
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(exerciseCollection);
  const [exerciseId, setExerciseId] = useState("");
  const [updateExercise, setUpdateExercise] = useState<UpdateExerciseBody>();
  const [open, setOpen] = React.useState(false);
  const openCreateExerciseDialog = async () => {
    const exerciseId = await createExercise(user?.uid);
    if (exerciseId) {
      setExerciseId(exerciseId);
      setUpdateExercise(undefined);
      setOpen(true);
    }
  };

  const openUpdateExerciseDialog = async (
    exerciseId: string,
    exercise: DocumentData
  ) => {
    const myExercise = exercise as UpdateExerciseBody;
    setExerciseId(exerciseId);
    setUpdateExercise(myExercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderImg = (doc: DocumentData) => {
    const exercise = doc as UpdateExerciseBody;
    if (exercise.img) {
      return <img src={exercise.img} alt="exercise" />;
    }
  };

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <span>
        Collection:{" "}
        {value &&
          value.docs.map((doc) => (
            <React.Fragment key={doc.id}>
              {renderImg(doc.data())}
              {JSON.stringify(doc.data())},{" "}
              <Button onClick={() => deleteExercise(doc.id)}>Delete</Button>
              <Button
                onClick={() => openUpdateExerciseDialog(doc.id, doc.data())}
              >
                Update
              </Button>
            </React.Fragment>
          ))}
      </span>
      <h2>Exercise</h2>
      {/* <Button onClick={() => createExercise(user?.uid)}>Create Exercise</Button> */}
      <div>
        <Button variant="outlined" onClick={openCreateExerciseDialog}>
          Create exercise
        </Button>
        <ExerciseDialog
          open={open}
          onClose={handleClose}
          idExercise={exerciseId}
          exercise={updateExercise}
        />
      </div>
    </div>
  );
};
