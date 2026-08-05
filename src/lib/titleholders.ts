export const TITLE_PAIRS: [string, string][] = [
  ['Nyong UNIMA', 'Noni UNIMA'],
  ['Wakil 1 Nyong', 'Wakil 1 Noni'],
  ['Wakil 2 Nyong', 'Wakil 2 Noni'],
  ['Harapan 1 Nyong', 'Harapan 1 Noni'],
  ['Harapan 2 Nyong', 'Harapan 2 Noni'],
  ['Nyong Berbakat', 'Noni Berbakat'],
  ['Nyong Favorit', 'Noni Favorit'],
  ['Nyong Fotogenik', 'Noni Fotogenik'],
  ['Nyong Duta Lingkungan', 'Noni Duta Lingkungan'],
  ['Nyong Duta Sosial', 'Noni Duta Sosial'],
  ['Nyong Duta Budaya', 'Noni Duta Budaya'],
  ['Nyong Duta Bahasa', 'Noni Duta Bahasa'],
  ['Nyong Duta Seni', 'Noni Duta Seni'],
  ['Nyong Persahabatan', 'Noni Persahabatan'],
]

export const PAIR_LABELS: Record<string, string> = {
  'Nyong UNIMA': 'Nyong UNIMA',
  'Noni UNIMA': 'Noni UNIMA',
  'Wakil 1 Nyong': 'Wakil I Nyong Noni UNIMA 2025',
  'Wakil 1 Noni': 'Wakil I Nyong Noni UNIMA 2025',
  'Wakil 2 Nyong': 'Wakil II Nyong Noni UNIMA 2025',
  'Wakil 2 Noni': 'Wakil II Nyong Noni UNIMA 2025',
  'Harapan 1 Nyong': 'Harapan I Nyong Noni UNIMA 2025',
  'Harapan 1 Noni': 'Harapan I Nyong Noni UNIMA 2025',
  'Harapan 2 Nyong': 'Harapan II Nyong Noni UNIMA 2025',
  'Harapan 2 Noni': 'Harapan II Nyong Noni UNIMA 2025',
  'Nyong Berbakat': 'Berbakat Nyong Noni UNIMA 2025',
  'Noni Berbakat': 'Berbakat Nyong Noni UNIMA 2025',
  'Nyong Favorit': 'Favorit Nyong Noni UNIMA 2025',
  'Noni Favorit': 'Favorit Nyong Noni UNIMA 2025',
  'Nyong Fotogenik': 'Fotogenik Nyong Noni UNIMA 2025',
  'Noni Fotogenik': 'Fotogenik Nyong Noni UNIMA 2025',
  'Nyong Duta Lingkungan': 'Duta Lingkungan Nyong Noni UNIMA 2025',
  'Noni Duta Lingkungan': 'Duta Lingkungan Nyong Noni UNIMA 2025',
  'Nyong Duta Sosial': 'Duta Sosial Nyong Noni UNIMA 2025',
  'Noni Duta Sosial': 'Duta Sosial Nyong Noni UNIMA 2025',
  'Nyong Duta Budaya': 'Duta Budaya Nyong Noni UNIMA 2025',
  'Noni Duta Budaya': 'Duta Budaya Nyong Noni UNIMA 2025',
  'Nyong Duta Bahasa': 'Duta Bahasa Nyong Noni UNIMA 2025',
  'Noni Duta Bahasa': 'Duta Bahasa Nyong Noni UNIMA 2025',
  'Nyong Duta Seni': 'Duta Seni Nyong Noni UNIMA 2025',
  'Noni Duta Seni': 'Duta Seni Nyong Noni UNIMA 2025',
  'Nyong Persahabatan': 'Persahabatan Nyong Noni UNIMA 2025',
  'Noni Persahabatan': 'Persahabatan Nyong Noni UNIMA 2025',
}

export function genderBadge(title: string) {
  if (
    title.includes('Duta') ||
    title.includes('Berbakat') ||
    title.includes('Fotogenik') ||
    title.includes('Persahabatan')
  ) return 'Nyong Noni'
  return title.includes('Nyong') ? 'Nyong' : 'Noni'
}
