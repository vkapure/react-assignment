'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addRow, updateRow, deleteRow } from '@/store/slices/tableSlice'
import { useState } from 'react'
import AppealModal from './component/AppealModal'

export default function Page() {
  const rows = useSelector((state: RootState) => state.table.rows)
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 5

  const handleSave = (data: any) => {
    if (data.id === 0) {
      dispatch(addRow({ ...data, id: Date.now() }))
    } else {
      dispatch(updateRow(data))
    }
  }

  const handleEdit = (row: any) => {
    setEditing(row)
    setIsModalOpen(true)
  }

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginated = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage)

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appeals</h2>
        <button
          onClick={() => {
            setEditing(null)
            setIsModalOpen(true)
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Appeal
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or status"
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm rounded overflow-hidden">
          <thead className="bg-gray-100 text-left text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.status}</td>
                <td className="border px-4 py-2">{row.date}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(row)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteRow(row.id))}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-4">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <AppealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editing}
      />
    </div>
  )
}
