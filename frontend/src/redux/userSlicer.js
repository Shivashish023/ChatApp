import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        selectedGroup:null,
        userGroups:[],
        onlineUsers:[],
        chatType:"user", // "user" or "group"
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
            if(action.payload){
                state.selectedGroup=null;
                state.chatType="user";
            }
        },
        setSelectedGroup:(state,action)=>{
            state.selectedGroup=action.payload;
            if(action.payload){
                state.selectedUser=null;
                state.chatType="group";
            }
        },
        setUserGroups:(state,action)=>{
            state.userGroups=action.payload;
        },
        addGroup:(state,action)=>{
           
            const groupExists = state.userGroups.some(group => group._id === action.payload._id);
            if(!groupExists){
                state.userGroups.push(action.payload);
            }
        },
        removeGroup:(state,action)=>{
            state.userGroups=state.userGroups.filter(group=>group._id!==action.payload);
            // Clear selectedGroup if it's the removed one
            if(state.selectedGroup && state.selectedGroup._id===action.payload){
                state.selectedGroup=null;
                state.chatType="user";
            }
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        },
        setChatType:(state,action)=>{
            state.chatType=action.payload;
        }
    }
});
export const {
    setAuthUser,
    setOtherUsers,
    setSelectedUser,
    setSelectedGroup,
    setUserGroups,
    addGroup,
    removeGroup,
    setOnlineUsers,
    setChatType
}=userSlice.actions;
export default userSlice.reducer;
