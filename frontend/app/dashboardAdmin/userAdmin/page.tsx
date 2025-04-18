'use client'
import React from 'react';
import { DataTable } from '@/components/admin/admin-table/data-table';
import { columnsAdmin } from '@/components/admin/admin-table/columns';
import { users } from "@/components/admin/data/users"
import { useEffect, useState } from 'react';

import { fetchAdminData } from '@/actions/authAdmin';
import {Admin} from '@/actions/authAdmin'

export default function userAdminTable() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    async function getAdmins() {
      try {
        const data = await fetchAdminData(); 
        setAdmins(data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    }

    getAdmins();
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-blue-100" />
      <div className="aspect-video rounded-xl bg-blue-100" />
      <div className="aspect-video rounded-xl bg-blue-100" />
      </div>
      <DataTable columns={columnsAdmin} data={admins} />
    </div>
  );
};