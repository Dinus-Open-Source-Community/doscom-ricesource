"use client"

import { useEffect, useState, useCallback } from "react"
import { DataTable } from "@/components/admin/config-table/data-table"
import { columns } from "@/components/admin/config-table/columns"
import { type ConfigForAdmin, fetchConfigForAdmin } from "@/actions/configForAdmin"
import { toast } from "sonner"
import { Calendar, Heart, Users, Database } from "lucide-react"

export default function ConfigTable() {
  const [config, setConfig] = useState<ConfigForAdmin[]>([])
  const [loading, setLoading] = useState(true)

  const getConfig = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetchConfigForAdmin()
      setConfig(res?.data || res || [])
    } catch (error) {
      console.error("Failed to fetch config data:", error)
      toast.error("Failed to fetch configurations", {
        description: "There was an error loading the configuration data. Please try again.",
      })
      setConfig([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getConfig()
  }, [getConfig])

  // Calculate statistics
  const totalConfigs = config.length
  const totalLikes = config.reduce((sum, cfg) => sum + (cfg.like || 0), 0)
  const uniqueAuthors = new Set(config.map((cfg) => cfg.author)).size
  const mostPopularConfig = config.reduce((max, cfg) => (cfg.like > (max?.like || 0) ? cfg : max), config[0])

  // Get most used distro
  const distroCount = config.reduce(
    (acc, cfg) => {
      acc[cfg.distro] = (acc[cfg.distro] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const mostUsedDistro = Object.entries(distroCount).reduce(
    (max, [distro, count]) => (count > max.count ? { distro, count } : max),
    { distro: "N/A", count: 0 },
  )

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-video rounded-xl bg-blue-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-green-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-purple-100 animate-pulse" />
          <div className="aspect-video rounded-xl bg-orange-100 animate-pulse" />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading configurations...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Statistics Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {/* Total Configurations */}
        <div className="aspect-video rounded-xl bg-blue-100 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-800">{totalConfigs}</div>
            <div className="text-sm text-blue-600">Total Configs</div>
          </div>
        </div>

        {/* Total Likes */}
        <div className="aspect-video rounded-xl bg-red-100 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-800">{totalLikes}</div>
            <div className="text-sm text-red-600">Total Likes</div>
          </div>
        </div>

        {/* Unique Authors */}
        <div className="aspect-video rounded-xl bg-green-100 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-800">{uniqueAuthors}</div>
            <div className="text-sm text-green-600">Contributors</div>
          </div>
        </div>

        {/* Most Popular Config or Most Used Distro */}
        <div className="aspect-video rounded-xl bg-purple-100 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-800 truncate max-w-full">{mostUsedDistro.distro}</div>
            <div className="text-sm text-purple-600">Popular Distro</div>
            <div className="text-xs text-purple-500">({mostUsedDistro.count} configs)</div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Most Liked Config */}
        {mostPopularConfig && (
          <div className="rounded-xl bg-gradient-to-r from-yellow-100 to-orange-100 p-4">
            <div className="text-center">
              <div className="text-sm font-medium text-orange-600 mb-1">Most Liked Config</div>
              <div className="text-lg font-bold text-orange-800 truncate">{mostPopularConfig.judul}</div>
              <div className="text-sm text-orange-600">
                {mostPopularConfig.like} likes • by {mostPopularConfig.author}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Environments */}
        <div className="rounded-xl bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
          <div className="text-center">
            <div className="text-sm font-medium text-cyan-600 mb-1">Desktop Environments</div>
            <div className="text-lg font-bold text-cyan-800">
              {new Set(config.map((cfg) => cfg.desktop_environment)).size}
            </div>
            <div className="text-sm text-cyan-600">Different DEs</div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
          <div className="text-center">
            <div className="text-sm font-medium text-indigo-600 mb-1">Last Updated</div>
            <div className="text-lg font-bold text-indigo-800">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-indigo-600">Today</div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl bg-white shadow-sm border">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Configuration Management</h2>
            <p className="text-sm text-gray-600">Manage and view all system configurations</p>
          </div>
          <DataTable columns={columns} data={config} refetchData={getConfig} />
        </div>
      </div>
    </div>
  )
}
