import validator from 'validator'

export const isValidData = (
  name,
  surname,
  email,
  phone,
) => {
  const emailFromForm = Array.isArray(email) ? email[0] : email;
  const isValidName = name.length >= 2 && name.length <= 60;
  const isValidSurname = surname.length >= 2 && surname.length <= 60;
  const isValidPhone = phone.length === 13 && phone.slice(0, 4) === '+380';
  const isValidEmail = validator.isEmail(emailFromForm);

  if (!isValidSurname) {
    return 'Your surname should be 2-60 characters';
  }

  if (!isValidName) {
    return 'Your name should be 2-60 characters';
  }

  if (!isValidPhone) {
    return 'Your phone should start with code of Ukraine +380 and be in total 13 characters';
  }

  if (!isValidEmail) {
    return 'Your email must be a valid according to RFC2822';
  }

  return 'all data valid'
}