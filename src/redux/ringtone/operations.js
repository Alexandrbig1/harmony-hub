// redux/ringtone/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/apiService";
import { toast } from "react-toastify";
import { commonToastOptions } from "@/helpers/toastOptions";

export const generateRingtone = createAsyncThunk(
    "ringtone/generate",
    async (ringtoneData, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            console.log('Generate Ringtone - Request Data:', ringtoneData);
            console.log('Generate Ringtone - Auth Token:', token);

            if (!token) {
                throw new Error('No authentication token available');
            }

            console.log('Making API request to:', '/ringtone/generate');
            const res = await api.post("/ringtone/generate", ringtoneData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Generate Ringtone - API Response:', res.data);
            toast.success("Your ringtone has been generated!", commonToastOptions);
            return res.data;
        } catch (error) {
            console.error('Generate Ringtone - Error Details:', {
                response: error.response?.data,
                status: error.response?.status,
                statusText: error.response?.statusText,
                error: error.message
            });

            toast.error(
                error.response?.data?.message || "Failed to generate ringtone",
                commonToastOptions
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);