import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    loading: false,
    errors: '',
    message : '',
    allPatients :[]
}

export const getOneDoctor = createAsyncThunk("getOneDoctor", async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.get("http://localhost:5000/api/doctor/getOne"
        ,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
  
  
      return data.data;
  
    } catch (error) {
      return error;
    }
  })
export const getAllPatients = createAsyncThunk("getAllPatients", async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/patient/getAll')
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const patientSlice = createSlice({
    name: 'patientSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase (getAllPatients.fulfilled, (state:any, action) => {
            state.allPatients = action.payload
        })
    }
})

export default patientSlice.reducer
