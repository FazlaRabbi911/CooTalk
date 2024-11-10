import { createSlice } from '@reduxjs/toolkit'

export const activeMsgSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    activeMsguser:(state,action)=>{
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { activeMsguser  } = activeMsgSlice.actions

export default activeMsgSlice.reducer