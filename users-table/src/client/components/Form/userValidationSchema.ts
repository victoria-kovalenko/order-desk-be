/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import {
  object, string, number, mixed,
} from 'yup';

const EMAIL_PATTERN = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const PHONE_PATTERN = /^[\+]{0,1}380([0-9]{9})$/;

const userSchema = object({
  name: string().min(2, 'Too short name').max(60, 'Too long name').required('Name is required'),
  email: string().matches(EMAIL_PATTERN, 'Incorrect Email').required('Email is required'),
  phone: string().matches(PHONE_PATTERN, '+38 (XXX) XXX - XX - XX').required('Phone is required'),
  positionId: number().min(1).required(),
  photo: mixed<File>().required('Photo is required').test('fileSize', 'The file is too large', (value) => {
    if (!value) {
      return true;
    }

    return value?.size < 5000000;
  }),
});

export default userSchema;
