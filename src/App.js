import {Navbar} from './components';
import { Routes, Route } from 'react-router-dom'
import { KIS, Pomodoro, Notes} from './pages';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/kis' element={<KIS/>}/>
        <Route path='/pomodoro' element={<Pomodoro/>}/>
        <Route path='/notes' element={<Notes/>}/>
      
      </Routes>
    </>
  );
}

export default App;
