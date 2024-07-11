import { createSlice } from '@reduxjs/toolkit'
import { joinPaths, json } from '@remix-run/router'

export const userslice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("activeUserdata") ? JSON.parse(localStorage.getItem("activeUserdata") )
    :null,
  },
  reducers: {
    activeuser:(state,action)=>{
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { activeuser  } = userslice.actions

export default userslice.reducer