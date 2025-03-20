import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Başlangıç durumu
const initialState = {
  shareCount: 0,
  loading: false,
  error: null,
};

// API'dan paylaşım sayısını çekmek için asenkron thunk
export const fetchShareCount = createAsyncThunk(
  'share/fetchShareCount',
  async () => {
    // Burada API'dan veri çekme işlemi yapılır
    const response = await fetch('https://api.example.com/share-count');
    const data = await response.json();
    return data.shareCount; // API'dan gelen paylaşım sayısı
  }
);

// Slice oluşturma
const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    // Paylaşım sayısını artırma
    incrementShareCount: (state) => {
      state.shareCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // API'dan veri çekme işlemi devam ederken
      .addCase(fetchShareCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // API'dan veri başarıyla çekildiğinde
      .addCase(fetchShareCount.fulfilled, (state, action) => {
        state.loading = false;
        state.shareCount = action.payload;
      })
      // API'dan veri çekme işlemi başarısız olduğunda
      .addCase(fetchShareCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action'ları export etme
export const { incrementShareCount } = shareSlice.actions;

// Reducer'ı export etme
export default shareSlice.reducer;