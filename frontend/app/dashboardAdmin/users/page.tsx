'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/user-table/data-table';
import { columns } from '@/components/admin/user-table/columns';
import { users } from "@/components/admin/data/users"

export default function userTable() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-blue-100" />
            <div className="aspect-video rounded-xl bg-blue-100" />
            <div className="aspect-video rounded-xl bg-blue-100" />
          </div>
          {/* <ConfigDataTable /> */}
          <DataTable columns={columns} data={users} />
        </div>
  );
};