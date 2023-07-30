export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  USER = 'user',
  EXERCISE = 'exercise',
  TRAINING = 'trainings',
  PLAN = 'plan',
  ALL_EXERCISE = 'all',
  ID = 'id',
  PUBLIC_EXERCISES = 'public',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.USER]: '/user',
  [AppRoutes.EXERCISE]: '/exercises',
  [AppRoutes.TRAINING]: '/trainings',
  [AppRoutes.PLAN]: '/plan',
  [AppRoutes.ALL_EXERCISE]: '/all-exercise',
  [AppRoutes.ID]: '/:id',
  [AppRoutes.PUBLIC_EXERCISES]: '/public-exercises',
};
