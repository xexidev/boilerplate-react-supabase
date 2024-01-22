import './index.css'
import ReactDOM from 'react-dom/client'
import Root from './pages/Root.jsx'
import ErrorPage from './ErrorPage.jsx'
import Home from './pages/Home/Home.jsx'
// Auth
import Register from './pages/Auth/Register/Register.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import Recover from './pages/Auth/Recover/Recover.jsx'
import Reset from './pages/Auth/Reset/Reset.jsx'
// User
import User from './pages/User/User.jsx'
// Elements
import Single from './pages/Elements/Single/Single.jsx'
import List from './pages/Elements/List/List.jsx'
import Create from './pages/Elements/Create/Create.jsx'
import Edit from './pages/Elements/Edit/Edit.jsx'
import Created from './pages/Elements/Created/Created.jsx'
//
import path from './paths.js'
/*
import UserAccount from '../components/pages/User Account/UserAccount'
*/
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      // Auth
      {
        path: path.userRegister,
        element: <Register />
      },
      {
        path: path.userLogin,
        element: <Login />
      },
      {
        path: path.userRecoverPassword,
        element: <Recover />
      },
      {
        path: path.userResetPassword,
        element: <Reset />
      },
      // User
      {
        path: path.user,
        element: <User />
      },
      // Elements
      {
        path: path.list,
        element: <List />
      },
      {
        path: path.single,
        element: <Single />
      },
      {
        path: path.create,
        element: <Create />
      },
      {
        path: path.edit,
        element: <Edit />
      },
      {
        path: path.created,
        element: <Created />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
