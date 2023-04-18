import React, { useEffect, useState } from 'react';
import { loadUsers, User } from '../../utils/get-users';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => setUsers(await loadUsers());
    load();
  }, []);

  return (
    <>
      {users.map((user) => (
        <h3 key={user.id} data-testid='user-item'>
          {user.name}
        </h3>
      ))}
    </>
  );
};
