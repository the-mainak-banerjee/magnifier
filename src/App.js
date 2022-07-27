import {Navbar} from './components';
import { Routes, Route, Navigate } from 'react-router-dom'
import { CreateNotes, KIS, Pomodoro, Notes, Trash, Archive, Folder} from './pages';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/kis' element={<KIS/>}/>
        <Route path='/pomodoro' element={<Pomodoro/>}/>
        <Route path='/notes' element={<Navigate to='/notes/notes'/>}/>
        <Route path='/notes/notes' element={<Notes/>}/>
        <Route path='/notes/:notesId' element={<CreateNotes/>}/>
        <Route path='/notes/archive' element={<Archive/>}/>
        <Route path='/notes/trash' element={<Trash/>}/>
        <Route path='/notes/folder' element={<Folder/>}/>
      </Routes>
    </>
  );
}

export default App;
