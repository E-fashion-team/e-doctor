import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
interface PatientState {
  patientInfo: any;
  loading: boolean;
  errors: string;
  message: string;
  isAuthenticated: boolean;
  type: string;
}

const initialState: PatientState = {
  patientInfo: {},
  loading: false,
  errors: "",
  message: "",
  isAuthenticated: false,
  type: "patient",
};

export const createPatient = createAsyncThunk(
  "createPatient",
  async (body: any) => {
    try {
      console.log(body)
      const data = await axios.post("http://localhost:5000/api/patient/register", {...body,phone:parseInt(body.phone)});
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginPatient = createAsyncThunk(
  "loginPatient",
  async (body: { email: string; password: string }) => {
    try {
      const data = await axios.post("http://localhost:5000/api/patient/login", body);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOnePatient = createAsyncThunk("getOnePatient", async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get("http://localhost:5000/api/patient/getOne", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
});

export const patientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    logoutPatient: (state) => {
      state.loading = false;
      state.errors = "";
      state.message = "";
      state.patientInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("type");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = "Patient created successfully";
    });
    builder.addCase(createPatient.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error?.message || "";;
    });
    builder.addCase(loginPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = action.payload.message;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("type", "patient");
    });
    builder.addCase(getOnePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.patientInfo = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { logoutPatient } = patientSlice.actions;

export default patientSlice.reducer;