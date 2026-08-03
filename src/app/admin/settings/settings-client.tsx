'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, X, Search, Save } from 'lucide-react'
import { updateSetting } from '@/server/actions/unima'
import { useRouter } from 'next/navigation'

export function SettingsClient({ data }: { data: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const isJsonObject = (value: string) => {
    try {
      const parsed = JSON.parse(value)
      return typeof parsed === 'object' && parsed !== null
    } catch {
      return false
    }
  }

  const formatValue = (value: string) => {
    if (isJsonObject(value)) {
      return JSON.stringify(JSON.parse(value), null, 2)
    }
    return value
  }

  const filtered = data.filter(
    (item) =>
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      String(item.value).toLowerCase().includes(search.toLowerCase()),
  )

  const openEdit = (item: any) => {
    setEditId(item.id)
    setEditValue(String(item.value))
  }

  const closeEdit = () => {
    setEditId(null)
    setEditValue('')
  }

  const handleSave = async (id: string) => {
    setLoading(true)
    try {
      // Try to parse as JSON if it looks like one
      let valueToSave: string = editValue
      if (isJsonObject(editValue)) {
        try {
          valueToSave = JSON.stringify(JSON.parse(editValue))
        } catch {
          valueToSave = editValue
        }
      }
      await updateSetting(id, valueToSave)
      setNotification({ type: 'success', message: 'Pengaturan berhasil disimpan' })
      closeEdit()
      router.refresh()
    } catch {
      setNotification({ type: 'error', message: 'Gagal menyimpan pengaturan' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-text">Pengaturan</h1>
          <p className="text-sm text-muted mt-1">Kelola pengaturan website</p>
        </div>
      </div>

      {notification && (
        <div className={`mb-4 rounded-lg p-3 text-sm ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {notification.message}
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Daftar Pengaturan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input placeholder="Cari pengaturan..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted">{search ? 'Tidak ada hasil' : 'Belum ada pengaturan'}</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item: any) => (
                <div key={item.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-sm font-mono text-primary">{item.key}</p>
                      {editId === item.id ? (
                        <div className="mt-2 space-y-2">
                          {isJsonObject(editValue) ? (
                            <textarea
                              className="flex h-32 w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-mono"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          ) : (
                            <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleSave(item.id)} disabled={loading}>
                              <Save className="h-3 w-3 mr-1" /> Simpan
                            </Button>
                            <Button size="sm" variant="outline" onClick={closeEdit}>Batal</Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-muted mt-1 font-mono text-xs break-all">{formatValue(String(item.value))}</p>
                          {item.updated_at && (
                            <p className="text-xs text-muted mt-1">
                              Diperbarui: {new Date(item.updated_at).toLocaleString('id-ID')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    {editId !== item.id && (
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
