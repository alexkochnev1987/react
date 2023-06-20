import { ExerciseResponse, getExerciseDocRef } from "../db/exercises";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeExerciseCard } from "../components/Exercise/Change-exercise-card";
import { RouteNames } from "../router/routes";

export const SetExercise = () => {
  const { id } = useParams();
  if (id) {
    const [exercise, loading, error] = useDocument(getExerciseDocRef(id));
    return (
      <>
        {exercise && (
          <ChangeExerciseCard
            exercise={
              { id: exercise.id, ...exercise.data() } as ExerciseResponse
            }
          />
        )}
      </>
    );
  }
  return null;
};
