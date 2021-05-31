import { ApolloError } from 'apollo-server-errors';

export const AuthenticationRequired = new ApolloError(
  'Forbidden: You may not have permission to access this function.',
  '403',
);
export const EmailAlreadyUsed = new ApolloError(
  'This email is already in used.',
  'RE-01',
  {
    showPath: true,
    showLocations: true,
  },
);
export const UserNotFound = new ApolloError('User not found.', '404', {
  showPath: true,
  showLocations: true,
});
export const UpdateFailed = new ApolloError(
  'Update failed: An error occurred updating data.',
  '1004',
  {
    showPath: true,
    showLocations: true,
  },
);
export const Unauthorized = new ApolloError('Unauthorized', '401', {
  showPath: true,
  showLocations: true,
});
export const IncorrectPassword = new ApolloError(
  'Incorrect password. Please try again',
  '401',
  {
    showPath: false,
    showLocations: false,
  },
);