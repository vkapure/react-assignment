'use client'

import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'

type FormData = {
  id: number
  name: string
  status: string
  date: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
  initialData?: FormData | null
}

export default function AppealModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<FormData>({
    id: 0,
    name: '',
    status: '',
    date: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ id: 0, name: '', status: '', date: '' })
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!form.name || !form.status || !form.date) return
    onSubmit(form)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-xl w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {form.id === 0 ? 'Add Appeal' : 'Edit Appeal'}
          </Dialog.Title>

          <div className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              placeholder="Status"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {form.id === 0 ? 'Add' : 'Update'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
