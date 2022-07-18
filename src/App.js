import {Navbar} from './components';
import { Routes, Route } from 'react-router-dom'
import {Goals, Journal, KIS, Pomodoro} from './pages';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/kis' element={<KIS/>}/>
        <Route path='/pomodoro' element={<Pomodoro/>}/>
        <Route path='/goals' element={<Goals/>}/>
        <Route path='/journal' element={<Journal/>}/>
      </Routes>
    </>
  );
}

export default App;
