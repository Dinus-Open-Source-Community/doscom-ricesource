'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/user-table/data-table';
import { columnsUsers } from '@/components/admin/user-table/columns';
import { fetchUserByAdmin, UserbyAdmin } from '@/actions/userByAdmin';

export default function userTable() {
  const [users, setUsers] = useState<UserbyAdmin[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const data = await fetchUserByAdmin();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-blue-100" />
        <div className="aspect-video rounded-xl bg-blue-100" />
        <div className="aspect-video rounded-xl bg-blue-100" />
      </div>
      <DataTable columns={columnsUsers} data={users} />
    </div>
  );
};