import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
