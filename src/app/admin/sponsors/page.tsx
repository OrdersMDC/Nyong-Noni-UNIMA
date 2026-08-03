import { getSponsors } from '@/server/actions/unima'
import { SponsorsClient } from './sponsors-client'

export default async function AdminSponsorsPage() {
  const data = await getSponsors().catch(() => [])
  return <SponsorsClient data={data as any[]} />
}
