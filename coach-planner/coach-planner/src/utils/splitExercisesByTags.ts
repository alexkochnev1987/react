import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ExerciseResponse } from "../db/exercises";

export const createObjectWithTagFields = (
  data: QuerySnapshot<DocumentData>
) => {
  return data.docs.reduce((prev, curr) => {
    const exercise = curr.data() as ExerciseResponse;
    const tags = (curr.data() as ExerciseResponse).tag;
    if (tags) {
      tags.forEach((x) => {
        prev[x] = prev[x] ? [...prev[x], exercise] : [exercise];
      });
      return prev;
    }
    prev["noTag"] = prev["noTag"] ? [...prev["noTag"], exercise] : [exercise];
    return prev;
  }, {} as { [key: string]: ExerciseResponse[] });
};
