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
import Search from './pages/Search'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Page404 from './components/Page404'
import TagPage from './pages/TagPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home type="random" />} />
      <Route path="trends" element={<Home type="trend" />} />
      <Route path="subscriptions" element={<Home type="sub" />} />
      <Route path="search" element={<Search />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="video">
        <Route path=":id" element={<Video />} />
      </Route>
      <Route path="tags">
        <Route path=":tags" element={<TagPage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
