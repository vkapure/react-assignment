import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CalendarState = {
  events: Record<string, string[]> // { "2025-07-09": ["Meeting", "Reminder"] }
}

const initialState: CalendarState = {
  events: {},
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (
      state,
      action: PayloadAction<{ date: string; value: string }>
    ) => {
      const { date, value } = action.payload
      if (!state.events[date]) state.events[date] = []
      state.events[date].push(value)
    },
    deleteEvent: (
      state,
      action: PayloadAction<{ date: string; index: number }>
    ) => {
      const { date, index } = action.payload
      if (state.events[date]) {
        state.events[date].splice(index, 1)
        if (state.events[date].length === 0) delete state.events[date]
      }
    },
  },
})

export const { addEvent, deleteEvent } = calendarSlice.actions
export default calendarSlice.reducer
