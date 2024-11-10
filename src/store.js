import { configureStore } from '@reduxjs/toolkit'
import userslice from './userslice'
import  activeMsgSlice  from './activeMsgSlice'

export default configureStore({
  reducer:{ 
  storeuser : userslice,
  storactiveMsg : activeMsgSlice,
}
})