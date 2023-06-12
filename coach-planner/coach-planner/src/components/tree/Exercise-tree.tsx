import { useCollection } from "react-firebase-hooks/firestore";
import { getExercisesByCoachId } from "../../db/exercises";
import { createObjectWithTagFields } from "../../utils/splitExercisesByTags";
import { List, ListSubheader, Stack, Switch, Typography } from "@mui/material";
import { ExpandTag } from "./Expand-tag";
import { useState } from "react";

export const ExerciseTree = ({ coachId }: { coachId: string }) => {
  const [exercises, loading, error] = useCollection(
    getExercisesByCoachId(coachId)
  );

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((state) => !state);
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Sort by Age</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography>Sort by tag</Typography>
      </Stack>
      <List sx={{ width: 250, bgcolor: "background.paper" }}>
        {exercises &&
          Object.entries(createObjectWithTagFields(exercises, checked))
            .filter((x) => (x ? true : false))
            .map((x) => {
              return <ExpandTag tag={x[0]} exercises={x[1]} key={x[0]} />;
            })}
      </List>
    </>
  );
};
