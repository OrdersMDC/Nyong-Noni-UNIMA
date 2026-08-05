import { getCurrentTitleholders } from '@/server/actions/unima'
import { TITLE_PAIRS, PAIR_LABELS } from '@/lib/titleholders'
import { TitleholderCard } from '@/components/titleholder-card'

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
