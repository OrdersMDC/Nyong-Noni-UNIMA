import { getCurrentTitleholders } from '@/server/actions/unima'
import { CurrentTitleholdersClient } from './current-titleholders-client'

export default async function AdminCurrentTitleholdersPage() {
  const data = await getCurrentTitleholders().catch(() => [])
  return <CurrentTitleholdersClient data={data as any[]} />
}
