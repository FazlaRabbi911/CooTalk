import { createSlice } from '@reduxjs/toolkit'

export const userslice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("activeUserdata") ? JSON.parse(localStorage.getItem("activeUserdata") )
    :null,
  },
  reducers: {
    activeuser:(state,action)=>{
        state.value = action.payload
        console.log(state.value)
    }
  },
})

// Action creators are generated for each case reducer function
export const { activeuser  } = userslice.actions

export default userslice.reducer