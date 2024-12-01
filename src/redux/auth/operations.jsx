// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import { URL } from "@/services/apiService";
// import { commonToastOptions } from "@/helpers/toastOptions";

// axios.defaults.baseURL = URL;

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

// export const register = createAsyncThunk(
//   "signup",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("/auth/signup", credentials);
//       setAuthHeader(res.data.user.token);
//       toast.success(
//         "Congratulations, your account has been successfully created. Welcome to Harmony Hub!",
//         commonToastOptions
//       );
//       return res.data;
//     } catch (error) {
//       toast.warning(
//         "Email already in use. Try logging in or reset your password.",
//         commonToastOptions
//       );
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logIn = createAsyncThunk(
//   "signin",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("/auth/signin", credentials);
//       setAuthHeader(res.data.token);
//       toast.success("Welcome to Harmony Hub!", commonToastOptions);
//       return res.data;
//     } catch (error) {
//       toast.error(
//         "Incorrect email or password. Please try again.",
//         commonToastOptions
//       );
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logOut = createAsyncThunk("logout", async (_, thunkAPI) => {
//   try {
//     await axios.post("/auth/logout");
//     clearAuthHeader();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue("Unable to fetch user");
//     }

//     try {
//       setAuthHeader(persistedToken);
//       const res = await axios.get("/users/current");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// redux/auth/operations.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { URL } from "@/services/apiService";
import { commonToastOptions } from "@/helpers/toastOptions";

// Set default baseURL
axios.defaults.baseURL = URL;

const setAuthHeader = (token) => {
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
	"auth/signup",
	async (credentials, thunkAPI) => {
		try {
			const res = await axios.post("/auth/signup", credentials);
			setAuthHeader(res.data.user.token);
			toast.success(
				"Congratulations, your account has been successfully created. Welcome to Harmony Hub!",
				commonToastOptions
			);
			return res.data;
		} catch (error) {
			toast.warning(
				"Email already in use. Try logging in or reset your password.",
				commonToastOptions
			);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logIn = createAsyncThunk(
	"auth/signin",
	async (credentials, thunkAPI) => {
		try {
			const res = await axios.post("/auth/signin", credentials);
			setAuthHeader(res.data.token);
			toast.success("Welcome to Harmony Hub!", commonToastOptions);
			return res.data;
		} catch (error) {
			toast.error(
				"Incorrect email or password. Please try again.",
				commonToastOptions
			);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await axios.post("/auth/logout");
		clearAuthHeader();
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const refreshUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.token;

		if (persistedToken === null) {
			return thunkAPI.rejectWithValue("Unable to fetch user");
		}

		try {
			setAuthHeader(persistedToken);
			const res = await axios.get("/users/current");
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
