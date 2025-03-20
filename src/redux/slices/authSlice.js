import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

// Kullanıcı giriş yapma işlemi
export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await authApi.login(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Kullanıcı kayıt işlemi
export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authApi.register(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Şifremi unuttum işlemi
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await authApi.forgotPassword(email);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    username:"",
    userPhoto: "",
    message:""
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.username="";
      state.userPhoto="";
      state.message = "";
    },
    setUserProfile: (state, action) => {
        state.username = action.payload.username;
        state.userPhoto = action.payload.userPhoto;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "E-posta başarıyla gönderildi. Lütfen e-posta adresinizi kontrol edin."; // Mesajı buraya ekledik
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
