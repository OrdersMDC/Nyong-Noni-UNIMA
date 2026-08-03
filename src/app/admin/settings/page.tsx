import { getSettings } from '@/server/actions/unima'
import { SettingsClient } from './settings-client'

export default async function AdminSettingsPage() {
  const data = await getSettings().catch(() => [])
  return <SettingsClient data={data as any[]} />
}
