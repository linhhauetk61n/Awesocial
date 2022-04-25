import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./userSlice";
import { postsSlice } from "./postsSlice";
import { messengerSlice } from "./messengerSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        posts: postsSlice.reducer,
        messenger: messengerSlice.reducer,
    },
});
export default store;
