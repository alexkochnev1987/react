const secondsInMinute = 60;

export const countExerciseTime = (
  explanation: number,
  repetitions: number,
  work: number,
  rest: number
) =>
  Number(explanation) +
  Number(
    Math.round(
      (Number(repetitions) * (Number(work) + Number(rest))) / secondsInMinute
    )
  );
