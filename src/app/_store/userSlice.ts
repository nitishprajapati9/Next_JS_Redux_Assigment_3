import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { User, UsersState } from "../types/Profile"



const initialState:UsersState = {
    users:[]
}

const userSlice = createSlice({
    name:"profiles",
    initialState,
    reducers:{
        setUsers:(state,action:PayloadAction<User[]>) =>{
            state.users = action.payload.map((user) => ({
                ...user,
                liked:user.liked ?? false
            }))
        },
        removeUser:(state,action:PayloadAction<number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        },
        updateUser:(state,action:PayloadAction<User>) => {
            const index = state.users.findIndex((index) => index.id === action.payload.id)
            if(index !== -1){
                state.users[index] = {
                    ...action.payload,
                    liked:action.payload.liked ?? state.users[index].liked
                }
            }
        },
        toggleLike:(state,action:PayloadAction<number>) => {
            const index = state.users.findIndex((index) => index.id === action.payload)
            if(index !== -1){
                state.users[index].liked = !state.users[index].liked
            }
        }
    }
});

export const {setUsers,removeUser,updateUser,toggleLike} = userSlice.actions

export default userSlice.reducer