import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from "./doctorSlice"
import patientReducer from './patinetSlice'

export const store = configureStore({
    reducer: {
        doctor: doctorReducer,
        patient: patientReducer
    }
})





export type RootState = ReturnType<typeof store.getState>




export type AppDispatch = typeof store.dispatch