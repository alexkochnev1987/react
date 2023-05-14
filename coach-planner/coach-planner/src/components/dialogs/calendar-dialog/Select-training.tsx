import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { trainingsCollection } from "../../../db/trainings";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { UseFormSetValue } from "react-hook-form";
import { MyCalendarEvents } from "./Event-form";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const SelectTraining = ({
  setValue,
  id,
  trainings,
}: {
  id: string | undefined;
  setValue: UseFormSetValue<MyCalendarEvents>;
  trainings: QuerySnapshot<DocumentData>;
}) => {
  const selectTrainingName = (id: string | undefined) => {
    const myTraining = trainings?.docs.find((x) => x.id === id)?.data() as {
      name?: string;
    };

    return myTraining?.name ? myTraining.name : "";
  };

  const [trainingId, setTrainingId] = useState(id);

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel>Select training</InputLabel>
        <Select
          value={trainingId}
          onChange={(date) => {
            setTrainingId(date.target.value);

            setValue("summary", selectTrainingName(date.target.value));
            setValue("training", date.target.value);
          }}
        >
          {trainings &&
            trainings.docs.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {(x.data() as { name: string }).name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
