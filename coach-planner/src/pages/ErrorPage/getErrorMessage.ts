import { isRouteErrorResponse } from 'react-router-dom';

export const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }
  //  else if (error instanceof Error) {
  //   return error.message;
  // } else if (typeof error === 'string') {
  //   return error;
  // } else {
  //   console.error(error);
  //   return 'Unknown error';
  // }
};
