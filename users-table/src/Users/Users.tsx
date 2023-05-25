import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { getUsers } from '../client/api/api';
import { User } from '../../src/client/types/User';
import { PrimaryBtn } from '../client/components/PrimaryBtn/PrimaryBtn';
import { UserItem } from './User/UserItem';
import s from './Users.module.scss';

interface Props {
  isFormSubmited: boolean
}

export const Users:FC<Props> = ({ isFormSubmited }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUsers(currentPage)
      .then(res => {
        setUsers(prevUsers => [...prevUsers, ...res.users]);

        if (res.page === res.total_pages) {
          setIsLastPage(true);
        }
      })
      .catch(() => toast.error("Can't load users!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    if (isFormSubmited && currentPage === 1) {
      setIsLoading(true);

      getUsers(currentPage)
        .then(res => setUsers(res.users))
        .catch(() => toast.error("Can't load users!"))
        .finally(() => setIsLoading(false));
    }

    if (isFormSubmited && currentPage !== 1) {
      setUsers([]);
      setCurrentPage(1);
    }
  }, [isFormSubmited]);

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={s.users}>
      <ul className={s.users__list}>
        {users.map(user => <UserItem key={user.id} user={user} />)}
      </ul>
      {isLoading && (
        <div className={s.users__loader}>
          <CircularProgress
            style={{ width: 48, height: 48, color: '#00BDD3' }}
          />
        </div>
      )}
      {!isLastPage && (
        <div className={s.users__loadBtn}>
          <PrimaryBtn onClick={handlePageChange} disabled={isLoading}>Show more</PrimaryBtn>
        </div>
      )}
    </div>
  );
};
