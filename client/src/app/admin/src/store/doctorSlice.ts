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
        const response = await axios.get('http://127.0.0.1:5000/api/doctors/getAll')
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getReviewsByDocId = createAsyncThunk("getReviewsByDocId", async (doctorId: number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/reviews/getAll/${doctorId}`)
        return response.data
    } catch (err) {
        console.log(err)
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