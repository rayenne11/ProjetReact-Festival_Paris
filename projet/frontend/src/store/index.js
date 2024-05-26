import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import bookSlice from "./BookSlice";
import clientSlice from "./ClientSlice";
import themeSlice from "./ModeSlice";
import loanSlice from "./LoanSlice";
import notificationsSlice from "./NotificationsSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer,
    client: clientSlice.reducer,
    theme: themeSlice.reducer,
    loan: loanSlice.reducer,
    notification: notificationsSlice.reducer,
  },
});

export default store;
