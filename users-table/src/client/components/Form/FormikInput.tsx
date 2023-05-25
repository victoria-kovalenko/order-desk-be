import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField/TextField';
import { Field, FieldProps } from 'formik';

const FormikInput = ({
  name,
  ...rest
}: { name: string; } & TextFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <TextField
            error={!!(meta.error && meta.touched)}
            {...rest}
            {...field}
            helperText={(meta.touched && meta.error) || rest.helperText}
          />
        );
      }}
    </Field>
  );
};

export default FormikInput;
