import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Row {
  id: number
  name: string
  status: string
  date: string
}

interface TableState {
  rows: Row[]
}

const initialState: TableState = {
  rows: [],
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<Row>) => {
      state.rows.push(action.payload)
    },
    updateRow: (state, action: PayloadAction<Row>) => {
      const index = state.rows.findIndex(row => row.id === action.payload.id)
      if (index !== -1) state.rows[index] = action.payload
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload)
    },
  },
})

export const { addRow, updateRow, deleteRow } = tableSlice.actions
export default tableSlice.reducer
