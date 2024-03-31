import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MainComponent from './component/MainComponent';
import Hotels from './component/Hotels';
import './App.css';
import NotFoundPage from './component/NotFoundPage';
import TestPage from './component/TestPage';

function App() {
  return (
    <BrowserRouter>
      <nav style = {{margin: 10}}>
        <NavLink to="/">Home Page</NavLink>
        <NavLink to="/hotel" style={{ padding: 10 }}>Hotels</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<MainComponent/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='hotel' element={<Hotels/>}/>
        <Route path='test/*' element={<TestPage/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
