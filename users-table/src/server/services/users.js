import { user } from './db.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = async() => {
  const info = await user.get();
  return info.docs.map((doc) => doc.data());
};

export const getUserById = (userId) => {
  const allData = getAllUsers();
  return allData.find((doc) => doc.id === userId);
};

export const uploadUser = async (
  name,
  surname,
  email,
  phone,
  date,
) => {
  const nameFromForm = Array.isArray(name) ? name[0] : name;
  const surnameFromForm = Array.isArray(surname) ? surname[0] : surname;
  const emailFromForm = Array.isArray(email) ? email[0] : email;
  const phoneFromForm = Array.isArray(phone) ? phone[0] : phone;
  const dateFromForm = Array.isArray(date) ? date[0] : date;

  let id = uuidv4();;

  user.add({ id, nameFromForm, surnameFromForm, emailFromForm, phoneFromForm, dateFromForm })

  return { id, nameFromForm, surnameFromForm, emailFromForm, phoneFromForm, dateFromForm };

  // return client.query(`
  //   INSERT INTO public."Users"
  //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  //   RETURNING *
  //   `,
  //   [newId, nameFromForm, surnameFromForm, emailFromForm, phoneFromForm, dateFromForm, new Date(), new Date()])
};