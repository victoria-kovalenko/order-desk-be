/* eslint-disable react/button-has-type */
import React, { FC } from 'react';
import s from './PrimaryBtn.module.scss';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void
}

export const PrimaryBtn: FC<Props> = ({
  type, disabled, onClick = () => {}, children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={s.primaryBtn}
    >
      {children}
    </button>
  );
};
