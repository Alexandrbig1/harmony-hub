// redux/ringtone/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { generateRingtone } from "./operations";

const initialState = {
    generatedUrl: null,
    isGenerating: false,
    error: null,
};

const ringtoneSlice = createSlice({
    name: "ringtone",
    initialState,
    reducers: {
        clearRingtone: (state) => {
            state.generatedUrl = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateRingtone.pending, (state) => {
                state.isGenerating = true;
                state.error = null;
            })
            .addCase(generateRingtone.fulfilled, (state, action) => {
                state.isGenerating = false;
                state.generatedUrl = action.payload.url;
                state.error = null;
            })
            .addCase(generateRingtone.rejected, (state, action) => {
                state.isGenerating = false;
                state.error = action.payload;
            });
    },
});

export const { clearRingtone } = ringtoneSlice.actions;
export const ringtoneReducer = ringtoneSlice.reducer;