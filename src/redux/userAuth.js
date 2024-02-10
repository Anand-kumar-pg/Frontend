import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false,
}

const userAuthSlice = createSlice({
    name: "userAuthSlice",
    initialState,
    reducers: {
        userAuthSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        userLogout: (state) => {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const { userAuthSuccess, userLogout } = userAuthSlice.actions
export default userAuthSlice.reducer 