'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/config-table/data-table';
import { columns } from '@/components/admin/config-table/columns';
import { ConfigForAdmin, fetchConfigForAdmin } from '@/actions/configForAdmin';


export default function FormsTable() {
  const [config, setConfig] = useState<ConfigForAdmin[]>([]);

  useEffect(() => {
  async function getConfig() {
    try {
      const res = await fetchConfigForAdmin();
      setConfig(res.data);
    } catch (error) {
      console.error('Failed to fetch config data:', error);
    }
  }
  getConfig();
}, []);


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-blue-100" />
        <div className="aspect-video rounded-xl bg-blue-100" />
        <div className="aspect-video rounded-xl bg-blue-100" />
      </div>
      <DataTable columns={columns} data={config} />
    </div>
  );
};

