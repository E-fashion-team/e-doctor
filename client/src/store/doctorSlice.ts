import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DoctorState {
  doctorInfo: Object;
  userRegistred: string;
  loading: boolean;
  errors: string;
  message: string | null;
  token: string;
  isAuthenticated: boolean;
  type: string;
  allDoctors: Array<Object>;
  allReviwes: Array<Object>;
  appoinements: Array<object>;
}

const initialState: DoctorState = {
  doctorInfo: {},
  userRegistred: "",
  loading: false,
  appoinements: [],
  errors: "",
  message: null,
  token: "",
  isAuthenticated: false,
  type: "doctor",
  allDoctors: [],
  allReviwes: [],
};

export const createDoctor = createAsyncThunk(
  "createDoctor",
  async (body: Object) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/doctor/register",
        body
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneDoctor = createAsyncThunk("getOneDoctor", async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get("http://localhost:5000/api/doctor/getOne", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return error;
  }
});

export const doctorLogin = createAsyncThunk(
  "doctorLogin",
  async (body: Object) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/doctor/login",
        body
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllDoctors = createAsyncThunk("getAllDoctors", async () => {
  try {
    const data = await axios.get("http://localhost:5000/api/doctor/getAll");
    return data.data;
  } catch (error) {
    return error;
  }
});

export const getReviewsByDocId = createAsyncThunk(
  "getReviewsByDocId",
  async (id: number) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api/review/getAll/${id}`
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

const doctorSlice = createSlice({
  name: "DoctorSlice",
  initialState,
  reducers: {
    logoutDoctor: (state) => {
      state.loading = false;
      state.errors = "";
      state.doctorInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("type");
    },
  },
  extraReducers(builder) {
    builder.addCase(createDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = action.payload.message;
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(doctorLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = action.payload.message;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("type", "doctor");
    });
    builder.addCase(getOneDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      (state.appoinements = action.payload.appointments),
        (state.doctorInfo = action.payload);
      state.isAuthenticated = true;
    });
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.allDoctors = action.payload;
    });
    builder.addCase(getReviewsByDocId.fulfilled, (state, action) => {
      state.allReviwes = action.payload;
    });
  },
});

export const { logoutDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
