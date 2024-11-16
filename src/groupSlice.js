import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    groupdata12:(state,action)=>{
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { groupdata12 } = groupSlice.actions

export default groupSlice.reducer