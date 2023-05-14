import React, { useState } from "react";

import { exerciseCollection, ExerciseResponse } from "../db/exercises";

import { useCollection } from "react-firebase-hooks/firestore";
import { ExerciseCard } from "../components/Exercise-card";
import { BoxFlexColumn } from "../components/styled/Box-d-flex";
import { OpenExerciseDialog } from "../components/Open-exercise-dialog";

export const Exercise = () => {
  const buttonLabel = "Create new exercise";
  const [value, loading, error] = useCollection(exerciseCollection);

  return (
    <BoxFlexColumn gap={1} padding={1}>
      <OpenExerciseDialog buttonLabel={buttonLabel} />
      {value &&
        value.docs.map((doc) => (
          <ExerciseCard
            key={doc.id}
            exercise={{ id: doc.id, ...doc.data() } as ExerciseResponse}
          />
        ))}
    </BoxFlexColumn>
  );
};
