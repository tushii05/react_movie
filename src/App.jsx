// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { About } from "./pages/About";
// import { Movie } from "./pages/Movie";
// import { Contact, contactData } from "./pages/Contact";
// import AppLayout from "./components/layout/AppLayout";
// import "./App.css";
// import { ErrorPage } from "./pages/ErrorPage";
// import { getMoviesData } from "./api/GetAPIData";
// import { MovieDetails } from "./components/UI/MovieDetails";
// import { getMovieDetails } from "./api/GetMovieDetails";

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <AppLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/about",
//           element: <About />,
//         },
//         {
//           path: "/movie",
//           element: <Movie />,
//           loader: getMoviesData,
//         },
//         {
//           path: "/movie/:movieID",
//           element: <MovieDetails />,
//           loader: getMovieDetails,
//         },
//         {
//           path: "/contact",
//           element: <Contact />,
//           action: contactData,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;



import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Movie } from "./pages/Movie";
import { Contact, contactData } from "./pages/Contact";
import AppLayout from "./components/layout/AppLayout";
import "./App.css";
import { ErrorPage } from "./pages/ErrorPage";
import { getMoviesData } from "./api/GetAPIData";
import { MovieDetails } from "./components/UI/MovieDetails";
import { getMovieDetails } from "./api/GetMovieDetails";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/welcome" />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
          path: "/about",
          element: <ProtectedRoute><About /></ProtectedRoute>,
        },
        {
          path: "/movie",
          element: <ProtectedRoute><Movie /></ProtectedRoute>,
          loader: getMoviesData,
        },
        {
          path: "/movie/:movieID",
          element: <ProtectedRoute><MovieDetails /></ProtectedRoute>,
          loader: getMovieDetails,
        },
        {
          path: "/contact",
          element: <ProtectedRoute><Contact /></ProtectedRoute>,
          action: contactData,
        },
      ],
    },
  ]);

  // return <RouterProvider router={router} />;
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;