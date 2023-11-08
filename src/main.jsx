import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx'
import  { Protected } from './components'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        )
      },
      {
        path: '/all-posts',
        element: (
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        )
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authentication={true}>
            <Post />
          </Protected>
        )
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
