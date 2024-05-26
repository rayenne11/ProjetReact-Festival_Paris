import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import BookLayout from "./layouts/BookLayout";
import AuthLayout from "./layouts/AuthLayout";
import BookList from "./pages/BookList/BookList";
import BookDetails from "./pages/BookDetails/BookDetails";

import RetrunBook from "./pages/ReturnBook/RetrunBook";
import LoanBook from "./pages/LoanBook/Loan";
import Contact from "./pages/Contact/Contact";
import EmailBox from "./components/EmailBox/EmailBox";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/books" element={<BookLayout />}>
        <Route index element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/loan" element={<LoanBook />} />
        <Route path="/returnBook" element={<RetrunBook />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notifications" element={<EmailBox />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
