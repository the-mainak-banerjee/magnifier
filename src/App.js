import {Navbar} from './components';
import { Routes, Route, Navigate } from 'react-router-dom'
import { KIS, Pomodoro, Notes, Trash, Archive, Folder} from './pages';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/kis' element={<KIS/>}/>
        <Route path='/pomodoro' element={<Pomodoro/>}/>
        <Route path='/notes' element={<Navigate to='/notes/notes'/>}/>
        <Route path='/notes/notes' element={<Notes/>}/>
        <Route path='/notes/archive' element={<Archive/>}/>
        <Route path='/notes/trash' element={<Trash/>}/>
        <Route path='/notes/folder' element={<Folder/>}/>
      </Routes>
    </>
  );
}

export default App;
