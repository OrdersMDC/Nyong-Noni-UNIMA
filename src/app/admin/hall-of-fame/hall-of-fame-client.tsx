'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X } from 'lucide-react'
import { createHallOfFame, deleteHallOfFame } from '@/server/actions/finalists'
import { useRouter } from 'next/navigation'

export function HallOfFameClient({ data }: { data: any[] }) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [form, setForm] = useState({ tahun: '', nyong_name: '', noni_name: '', nyong_photo_url: '', noni_photo_url: '', kabupaten_kota: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await createHallOfFame({ ...form, tahun: Number(form.tahun) } as any)
      if (result?.error) {
        setError(String(result.error))
        return
      }
      setNotification({ type: 'success', message: 'Data Hall of Fame berhasil ditambahkan' })
      setShowAdd(false)
      setForm({ tahun: '', nyong_name: '', noni_name: '', nyong_photo_url: '', noni_photo_url: '', kabupaten_kota: '' })
      router.refresh()
    } catch {
      setNotification({ type: 'error', message: 'Gagal menambahkan data' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus entri Hall of Fame?')) return
    try {
      await deleteHallOfFame(id)
      setNotification({ type: 'success', message: 'Data berhasil dihapus' })
      router.refresh()
    } catch {
      setNotification({ type: 'error', message: 'Gagal menghapus data' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-text">Hall of Fame</h1>
        <Button onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />Tambah</Button>
      </div>

      {notification && (
        <div className={`mb-4 rounded-lg p-3 text-sm ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {notification.message}
        </div>
      )}

      <Card>
        <CardHeader><CardTitle className="text-lg">Daftar Pemenang</CardTitle></CardHeader>
        <CardContent>
          {data.length === 0 ? <div className="text-center py-12 text-muted">Belum ada data</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead><tr className="border-b border-border text-muted">
                  <th className="pb-3 font-medium">Tahun</th><th className="pb-3 font-medium">Nyong</th><th className="pb-3 font-medium">Noni</th><th className="pb-3 font-medium">Kota</th><th className="pb-3 font-medium text-right">Aksi</th>
                </tr></thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-3 font-bold">{item.tahun}</td>
                      <td className="py-3">{item.nyong_name}</td>
                      <td className="py-3">{item.noni_name}</td>
                      <td className="py-3 text-muted">{item.kabupaten_kota}</td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tambah Hall of Fame</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><Label>Tahun</Label><Input required type="number" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Nama Nyong</Label><Input required value={form.nyong_name} onChange={(e) => setForm({ ...form, nyong_name: e.target.value })} /></div>
                  <div><Label>Nama Noni</Label><Input required value={form.noni_name} onChange={(e) => setForm({ ...form, noni_name: e.target.value })} /></div>
                </div>
                <div><Label>Kabupaten/Kota</Label><Input required value={form.kabupaten_kota} onChange={(e) => setForm({ ...form, kabupaten_kota: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Foto Nyong (URL)</Label><Input value={form.nyong_photo_url} onChange={(e) => setForm({ ...form, nyong_photo_url: e.target.value })} /></div>
                  <div><Label>Foto Noni (URL)</Label><Input value={form.noni_photo_url} onChange={(e) => setForm({ ...form, noni_photo_url: e.target.value })} /></div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
