import { useCollection } from "react-firebase-hooks/firestore";
import { getExercisesByCoachId } from "../../db/exercises";
import { createObjectWithTagFields } from "../../utils/splitExercisesByTags";
import { List, ListSubheader } from "@mui/material";
import { ExpandTag } from "./Expand-tag";

export const ExerciseTree = ({ coachId }: { coachId: string }) => {
  const [exercises, loading, error] = useCollection(
    getExercisesByCoachId(coachId)
  );

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {exercises &&
          Object.entries(createObjectWithTagFields(exercises))
            .filter((x) => (x ? true : false))
            .map((x) => {
              return <ExpandTag tag={x[0]} exercises={x[1]} key={x[0]} />;
            })}
      </List>
    </>
  );
};
