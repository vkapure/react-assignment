'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Dialog } from '@headlessui/react'

type CalendarEvent = {
  title: string
  date: string
  color: string
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'event' | 'reminder'>('event')

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setShowModal(true)
  }

  const handleAdd = () => {
    if (!title.trim()) return
    setEvents([
      ...events,
      {
        title: `${type === 'event' ? '🟦' : '🟩'} ${title}`,
        date: selectedDate,
        color: type === 'event' ? '#3B82F6' : '#10B981', // Blue or Green
      },
    ])
    setShowModal(false)
    setTitle('')
    setType('event')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
        selectable
      />

      {/* Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-md shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add to {selectedDate}
            </Dialog.Title>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            {/* Event Type Selector */}
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="event"
                  checked={type === 'event'}
                  onChange={() => setType('event')}
                />
                Event
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="reminder"
                  checked={type === 'reminder'}
                  onChange={() => setType('reminder')}
                />
                Reminder
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
