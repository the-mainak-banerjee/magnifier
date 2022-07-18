import {Navbar} from './components';
import { Routes, Route } from 'react-router-dom'
import {KIS} from './pages';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/kis' element={<KIS/>}/>
      </Routes>
    </>
  );
}

export default App;
