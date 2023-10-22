import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    errors: "",
    message: null,
    allDoctors: [],
    allReviews: []
};

export const getAllDoctors = createAsyncThunk("getAllDoctors", async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/doctor/getAll')
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getReviewsByDocId = createAsyncThunk("getReviewsByDocId", async (doctorId: number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/review/getAll/${doctorId}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})
export const removeDoctor = createAsyncThunk('api/doctor', async (id:number,{dispatch})=>{
    try {console.log('this is id', id);
  
     const response = await axios.delete(`http://localhost:5000/api/doctor/${id}`)
   return (await (dispatch(getAllDoctors()))).payload
   }
    catch(error) {
     console.log(error);
  
    }
   });
   export const updateDoctor = createAsyncThunk('updateDoctor', async(doctorId : number)=>{
    try {
        const response = await axios.put(`http://127.0.0.1:5000/api/doctor/${doctorId}`,{"isVerified":true})
        console.log('is worked' , response.data)
        
        return response.data
    } catch (error) {
        throw error
    }
   })

const userSlicer = createSlice({
    name: "doctorSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllDoctors.fulfilled, (state: any, action) => {
            state.allDoctors = action.payload;
        });
        builder.addCase(getReviewsByDocId.fulfilled, (state: any, action) => {
            state.allReviews = action.payload;
        })
    }
})

export default userSlicer.reducer;