import { getCurrentTitleholders } from '@/server/actions/unima'
import { TitleholdersGrid } from '@/components/titleholders-grid'

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
            <TitleholdersGrid titleholders={titleholders} />
          )}
        </div>
      </section>
    </div>
  )
}
