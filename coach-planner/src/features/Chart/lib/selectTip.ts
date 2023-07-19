import { IExerciseParams } from '../Chart';

export const selectTip = (key: string) => {
  const exerciseKeys: Array<keyof IExerciseParams> = ['CP', 'CP+LA', 'LA', 'O2', 'Rest'];
  switch (key) {
    case exerciseKeys[0]:
      return 'Speed & power';
    case exerciseKeys[1]:
      return 'Speed & Speed endurance';
    case exerciseKeys[2]:
      return 'Speed endurance & anaerobic capacity';
    case exerciseKeys[3]:
      return 'Anaerobic & aerobic capacity';
    case exerciseKeys[4]:
      return 'Rest & relax';
    default:
      return 'No data';
  }
};
