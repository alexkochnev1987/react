import { useDocument } from "react-firebase-hooks/firestore";
import { BoxFlexColumn } from "../components/styled/Box-d-flex";

import { Training } from "../components/training/Training";
import { useParams } from "react-router-dom";
import { TrainingResponse, getTrainingRef } from "../db/trainings";

export const TrainingPage = () => {
  const { id } = useParams();
  const [value, loading, error] = useDocument(getTrainingRef(id));

  return (
    <BoxFlexColumn gap={1} padding={1}>
      {value && (
        <Training
          training={{ id: value.id, ...value.data() } as TrainingResponse}
        />
      )}
    </BoxFlexColumn>
  );
};
