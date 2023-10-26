import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from "./component/layout/layout"
import Profile from './component/profile/profile';
import Register from './component/register/register';
import Login from "./component/login/login"
import ProtectedRouter from './component/protectedRouter/protectedRouter';
import TodoWrapper from "./component/addTask/TodoWrapper"



const router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      {
        path: "", element: <ProtectedRouter> <Profile /></ProtectedRouter>
      },
      {
        path: "login", element: <Login />
      },
      {
        path: "register", element: <Register />
      },
      {
        path: "addTask", element: <ProtectedRouter><TodoWrapper /></ProtectedRouter>
      },

    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
