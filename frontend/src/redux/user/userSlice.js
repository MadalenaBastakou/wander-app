import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    setLogin: (state, action) => {
        state.user = action.payload.user.rest
        state.token = action.payload.user.token
    }
}
})

export const {setLogin} = userSlice.actions
export default userSlice.reducer