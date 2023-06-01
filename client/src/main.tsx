import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Video from './pages/Video'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home type="random" />} />
      <Route path="trends" element={<Home type="trend" />} />
      <Route path="subscriptions" element={<Home type="sub" />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="video">
        <Route path=":id" element={<Video />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
