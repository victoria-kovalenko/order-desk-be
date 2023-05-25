/* eslint-disable no-debugger */
import React, { FC  } from 'react';
import { Tooltip } from '@mui/material';
import { User } from '../../client/types/User';
import s from './UserItem.module.scss';

interface Props {
  user: User
}

export const UserItem:FC<Props> = ({ user }) => {
  const {
    id, name, surname, email, phone, date
  } = user;

  return (
    <li key={id} className={s.user}>

      <Tooltip title={name}>
        <h3 className={s.user__name}>{name} {surname} { date}</h3>
      </Tooltip>

      <div className={s.user__info}>
        <Tooltip title={email}>
          <a
            className={s.user__mail}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </Tooltip>

        <Tooltip title={phone}>
          <a
            className={s.user__phone}
            href={`tel:${phone}`}
          >
            {phone}
          </a>
        </Tooltip>
      </div>
    </li>
  );
};
