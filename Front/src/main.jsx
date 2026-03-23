 import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter,Routes,Route} from 'react-router-dom'
import ListArticles from './pages/Blog/ListArticles.jsx'
import SingleArticle from './pages/Blog/Singlearticle.jsx'
import PublicArticle from './pages/Blog/PublicArticle.jsx'
import CreateArticle from './pages/Blog/CreateArticle.jsx'
import UpdateArticle from './pages/Blog/UpdateArticle.jsx'
import UsersList from './pages/Admin/UsersList.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminLayout from './components/AdminLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/article/:articleId' element={<PublicArticle/>}/>

      <Route path='/blog/Login' element={<Login/>}/>
      <Route path='/blog/Signup' element={<Signup/>}/>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path='/admin/blog' element={<ListArticles/>}/> 
          <Route element={<AdminRoute />}>
            <Route path='/admin/users' element={<UsersList/>}/> 
          </Route>
          <Route path='/admin/blog/articles/:articleId' element={<SingleArticle/>}/>
          <Route path='/admin/blog/create' element={<CreateArticle/>}/> 
          <Route path='/admin/blog/article-edit/:articleId' element={<UpdateArticle/>}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
     
  </StrictMode>,
)
