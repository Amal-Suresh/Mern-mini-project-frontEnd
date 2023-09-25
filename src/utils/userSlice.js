import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        userD:{
            id:null,
            name:null
        } 
    },
    reducers:{
        addUser:(state,action)=>{
            state.userD.id=action.payload.id;
            state.userD.name=action.payload.name;
        },
        removeUser:(state,action)=>{
            state.userD.id=null
            state.userD.name=null
        }
    }
})

export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer
