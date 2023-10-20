
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";

const initialState = {
    patientInfo:{},
    // userRegistred: false,
    loading: false,
    errors: "",
    message: "",
    isAuthenticated: false,
    name : "",
    type: "patient"
}

export const getOnePatient = createAsyncThunk("getOnePatient", async () => {
    try {
      const token :any= localStorage.getItem("token");
      const decodedToken :any = jwt_decode(token);
      const username :any = decodedToken.username;
      const data = await axios.get("http://localhost:5000/api/patient/getOne", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return { ...data.data, username };
    } catch (error) {
      return error;
    }
  });
export const createPatient = createAsyncThunk("createPatient", async (body: Object) => {
    try {
        const data = await axios.post("http://localhost:5000/api/patient/register", body)
        console.log(data.data,"data")
        return data.data
    } catch (error) {
        return error
    }
})
export const loginPatient = createAsyncThunk("loginPatient", async (body: Object) => {
    try {
        const data = await axios.post("http://localhost:5000/api/patient/login", body)
        return data.data
    } catch (error) {
        return error
    }
})
// export const getOnePatient = createAsyncThunk("getOnePatient", async () => {
//     try {
//         const token =localStorage.getItem("token")
//         const data = await axios.get("http://localhost:5000/api/patient/getOne", {
//         headers:{
//             authorization:`Bearer ${token}`
//         }
//         })
//         return data.data
//     } catch (error) {
//         return error
//     }
// })



export const patientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers: {
        logoutPatient: (state) => {
                state.loading = false
                state.errors = ""
                state.message = ""
                state.patientInfo = {}
                state.isAuthenticated = false
                localStorage.removeItem("token")
                localStorage.removeItem("type")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPatient.fulfilled, (state, action) => {
            // state.userRegistred = true
            state.loading = false
            state.errors = ""
            state.message = action.payload.message
        })
        builder.addCase(createPatient.rejected, (state, action) => {
            state.loading = false
            // localStorage.setItem("token", "")
            // state.message = action.payload
            // state.errors=action.payload.errors.message
            // state.errors=action.payload
        })
        builder.addCase(loginPatient.fulfilled, (state, action) => {
            state.loading = false
            state.errors = ""
            state.message = action.payload.message
            state.isAuthenticated = true
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("type", "patient");
        })
        builder.addCase(getOnePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.errors = "";
            state.patientInfo = action.payload;
            state.name = action.payload.username;
            state.isAuthenticated = true;
          });
    }
})
export const { logoutPatient } = patientSlice.actions

export default patientSlice.reducer;
