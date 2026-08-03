import { Instagram, GraduationCap, BookOpen, Quote } from 'lucide-react'
import { getCurrentTitleholders } from '@/server/actions/unima'

const TITLE_PAIRS: [string, string][] = [
  ['Nyong UNIMA', 'Noni UNIMA'],
  ['Wakil 1 Nyong', 'Wakil 1 Noni'],
  ['Wakil 2 Nyong', 'Wakil 2 Noni'],
  ['Harapan 1 Nyong', 'Harapan 1 Noni'],
  ['Harapan 2 Nyong', 'Harapan 2 Noni'],
  ['Nyong Berbakat', 'Noni Berbakat'],
  ['Nyong Favorit', 'Noni Favorit'],
  ['Nyong Duta Lingkungan', 'Noni Duta Lingkungan'],
  ['Nyong Duta Sosial', 'Noni Duta Sosial'],
  ['Nyong Duta Budaya', 'Noni Duta Budaya'],
  ['Nyong Duta Seni', 'Noni Duta Seni'],
]

const PAIR_LABELS: Record<string, string> = {
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
  'Nyong Duta Lingkungan': 'Duta Lingkungan Nyong Noni UNIMA 2025',
  'Noni Duta Lingkungan': 'Duta Lingkungan Nyong Noni UNIMA 2025',
  'Nyong Duta Sosial': 'Duta Sosial Nyong Noni UNIMA 2025',
  'Noni Duta Sosial': 'Duta Sosial Nyong Noni UNIMA 2025',
  'Nyong Duta Budaya': 'Duta Budaya Nyong Noni UNIMA 2025',
  'Noni Duta Budaya': 'Duta Budaya Nyong Noni UNIMA 2025',
  'Nyong Duta Seni': 'Duta Seni Nyong Noni UNIMA 2025',
  'Noni Duta Seni': 'Duta Seni Nyong Noni UNIMA 2025',
}

function genderBadge(title: string) {
  if (title.includes('Duta') || title.includes('Berbakat')) return 'Nyong Noni'
  return title.includes('Nyong') ? 'Nyong' : 'Noni'
}

function TitleholderCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-[20px] border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Photo */}
      <div className="aspect-[3/4] overflow-hidden bg-light-gray">
        {item.photo_url ? (
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-blue/5 to-gold/5">
            <span className="text-display-xl text-primary-blue/20 font-bold">
              {item.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-2 inline-flex items-center px-2 py-0.5 rounded-md bg-light-gray text-[10px] font-semibold uppercase tracking-widest text-dark-secondary">
          {genderBadge(item.title)}
        </div>
        <h3 className="text-headline text-dark-text mb-1">{item.name}</h3>

        {item.faculty && (
          <p className="flex items-center gap-1.5 text-body-sm text-dark-secondary mb-1">
            <GraduationCap className="h-4 w-4 shrink-0" />
            {item.faculty}
          </p>
        )}
        {item.study_program && (
          <p className="flex items-center gap-1.5 text-body-sm text-dark-secondary mb-3">
            <BookOpen className="h-4 w-4 shrink-0" />
            {item.study_program}
          </p>
        )}

        {item.instagram && (
          <a
            href={`https://instagram.com/${item.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-body-sm text-primary-blue hover:opacity-80 transition-opacity mb-3"
          >
            <Instagram className="h-4 w-4" />
            @{item.instagram}
          </a>
        )}

        {item.biography && (
          <p className="text-body-sm text-dark-secondary italic leading-relaxed border-t border-border pt-3 mt-3">
            <Quote className="h-3.5 w-3.5 text-dark-secondary/30 inline mr-1" />
            {item.biography}
          </p>
        )}
      </div>
    </div>
  )
}

export default async function CurrentTitleholdersPage() {
  const titleholders = await getCurrentTitleholders().catch(() => []) as any[]

  const isEmpty = titleholders.length === 0

  return (
    <div className="bg-white min-h-screen pb-[120px]">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center pt-[180px] pb-[96px] px-[20px] text-center border-b border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-caption text-dark-secondary uppercase tracking-widest mb-4">
            Nyong &amp; Noni UNIMA
          </p>
          <h1 className="text-display-xl text-dark-text tracking-tighter mb-8 animate-fade-in">
            <span className="text-primary-blue">Saat Ini</span>
          </h1>
          <p className="text-subhead text-dark-secondary max-w-2xl mx-auto">
            Para pemegang gelar Nyong dan Noni UNIMA yang sedang menjabat
          </p>
        </div>
      </section>

      {/* ─── TITLEHOLDERS ─── */}
      <section className="py-[96px]">
        <div className="mx-auto max-w-7xl px-[20px]">
          {isEmpty ? (
            <div className="py-20 text-center max-w-lg mx-auto">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-border">
                <span className="text-display-md text-dark-secondary">NN</span>
              </div>
              <h2 className="text-display-md text-dark-text mb-4">Belum Ada Data</h2>
              <p className="text-body-lg text-dark-secondary leading-relaxed">
                Data titleholders yang sedang menjabat belum tersedia.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {TITLE_PAIRS.map(([nyongTitle, noniTitle]) => {
                const nyong = titleholders.find((t: any) => t.title === nyongTitle)
                const noni = titleholders.find((t: any) => t.title === noniTitle)

                if (!nyong && !noni) return null

                const pairLabel = PAIR_LABELS[nyongTitle] || nyongTitle
                const isMainPair = nyongTitle === 'Nyong UNIMA'

                return (
                  <div key={nyongTitle}>
                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`h-px flex-1 ${isMainPair ? 'bg-gold/30' : 'bg-hairline'}`} />
                      <span
                        className={`text-[13px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full ${
                          isMainPair
                            ? 'text-gold-dark bg-gold/10 border border-gold/20'
                            : 'text-dark-secondary bg-white border border-border'
                        }`}
                      >
                        {pairLabel}
                      </span>
                      <div className={`h-px flex-1 ${isMainPair ? 'bg-gold/30' : 'bg-hairline'}`} />
                    </div>

                    {/* Cards */}
                    <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
                      {nyong && <TitleholderCard item={nyong} />}
                      {noni && <TitleholderCard item={noni} />}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
