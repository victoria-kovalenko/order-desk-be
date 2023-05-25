import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { addUser } from '../../api/api';
import successImage from './success-image.svg';
import { PrimaryBtn } from '../PrimaryBtn/PrimaryBtn';
import FormikInput from './FormikInput';
import userSchema from './userValidationSchema';
import s from './Form.module.scss';

interface Props {
  isSubmited: boolean,
  setIsSubmited: (state: boolean) => void
}

export const Form: FC<Props> = ({ isSubmited, setIsSubmited }) => {
  const [isLoading, setIsLoading] = useState(false);

  interface FormValues {
    name: string,
    surname: string,
    email: string,
    phone: string,
    date: string,
  }

  const sendFormData = (values: FormValues) => {
    setIsLoading(isLoading);

    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('surname', values.surname);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('date', values.date);

    addUser(formData)
      .then(() => {
        setIsSubmited(true);
      })
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const initialFormValues: FormValues = {
    name: '', surname: '', email: '', phone: '+380', date: '',
  };

  return isSubmited
    ? (
      <img src={successImage} alt="Success" className={s.successImage} />
    )
    : (
      <Formik
        initialValues={initialFormValues}
        validationSchema={userSchema}
        onSubmit={sendFormData}
      >
        {({
          handleSubmit, setFieldValue, setFieldTouched, values, errors, touched,
        }) => (
          <form className={s.form} onSubmit={handleSubmit}>
            <ul className={s.form__textFieldList}>
              <li className={s.form__textFieldItem}>
                <FormikInput
                  name="name"
                  type="text"
                  label="Your name"
                />
              </li>

              <li className={s.form__textFieldItem}>
                <FormikInput
                  name="surname"
                  type="text"
                  label="Your surname"
                />
              </li>

              <li className={s.form__textFieldItem}>
                <FormikInput
                  name="email"
                  type="email"
                  label="Email"
                />
              </li>

              <li className={s.form__textFieldItem}>
                <FormikInput
                  name="phone"
                  type="tel"
                  label="Phone"
                  helperText="+38 (XXX) XXX - XX - XX"
                />
              </li>

              <li className={s.form__textFieldItem}>
                <FormikInput
                  name="date"
                  type="date"
                  label="Birthday date"
                />
              </li>
            </ul>

            <PrimaryBtn type="submit" disabled={isLoading}>Sign Up</PrimaryBtn>
          </form>
        )}
      </Formik>
    );
};
