import { configureStore } from "@reduxjs/toolkit";  //to make store we are using configureStore
import activeUserSlice from "./redux/activeUserSlice";
import chatsSlice from "./redux/chatsSlice";
import profileSlice from "./redux/profileSlice";
import searchSlice from "./redux/searchSlice";
const store = configureStore({    //here we are making redux store here;  so this is our redux store
  reducer: {                          //ye reducer hai --> jo event ko handle karta h  ; //store ke andar reducers hota h isiliye yahan bhi h
    activeUser: activeUserSlice,
    profile: profileSlice,
    search: searchSlice,
    chats: chatsSlice,
  },
});
export default store;
