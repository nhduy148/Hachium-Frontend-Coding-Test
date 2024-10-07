import { template } from 'lodash';

// Translate all the messages to English
export const DEFAULT_REQUIRED_MESSAGE = 'Please do not leave this field empty';
export const DEFAULT_ARRAY_MIN = template('Select at least <%= min %> <%= kind %>');
export const INVALID_EMAIL = 'Invalid email format';

export const WRONG_PHONE_NUMBER = 'Wrong phone number format';
export const WRONG_EMAIL = 'Wrong email format';
export const REQUIRED_PHONE_NUMBER = 'Please enter your phone number';

export const MIN_PASSWORD_LENGTH = template('Password length must be at least <%= min %> characters');
export const PASSWORD_IS_NOT_MATCHED = 'Password does not match';
export const DEFAULT_INVALID_FILE = 'Invalid file';

export const INVALID_POSITIVE_NUMBER = 'Please enter a number greater than 0';
