import { configureStore } from '@reduxjs/toolkit'
import userslice from './userslice'
import  activeMsgSlice  from './activeMsgSlice'
import groupSlice  from './groupSlice'




export default configureStore({
  reducer:{ 
  storeuser : userslice,
  storactiveMsg : activeMsgSlice,
  groupdataStore: groupSlice
}
})