import { lazy, Suspense } from 'react';
import {Navbar, PrivateRoute, RestrictedRoute} from './components';
import { Routes, Route, Navigate } from 'react-router-dom'
import { CreateNotes, Trash, Archive, Folder } from './pages';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';
import Loading from './pages/falllback/Loading';

const KIS = lazy(() => import('./pages/kis/KIS'))
const Pomodoro = lazy(() => import('./pages/pomodoro/Pomodoro'))
const Notes = lazy(() => import('./pages/notes/Notes'))
const Profile = lazy(() => import('./pages/profile/Profile'))

function App() {
  return (
    <>
      <Navbar/>
      <Suspense
        fallback={<Loading/>}
      >
        <Routes>
          <Route element={<RestrictedRoute/>}>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/kis' element={<KIS/>}/>
            <Route path='/pomodoro' element={<Pomodoro/>}/>
            <Route path='/notes' element={<Navigate to='/notes/notes'/>}/>
            <Route path='/notes/notes' element={<Notes/>}/>
            <Route path='/notes/:notesId' element={<CreateNotes/>}/>
            <Route path='/notes/archive' element={<Archive/>}/>
            <Route path='/notes/trash' element={<Trash/>}/>
            <Route path='/notes/folder' element={<Folder/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
