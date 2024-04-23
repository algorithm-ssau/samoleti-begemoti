import { Outlet, Routes, Route, NavLink } from 'react-router-dom';
import DeadendOne from '../deadends/DeadendOne';
import DeadendTwo from '../deadends/DeadendTwo';
import DeadendThree from '../deadends/DeadendThree';
export default function TestPage() {
    return (
  <>
  
  <nav style = {{margin: 10}}>
      <button><NavLink to='deadone'>DeadendOne</NavLink></button>
      <button><NavLink to='deadtwo'>DeadebdTwo</NavLink></button>
      <button><NavLink to='deadthree'>DeadendThree</NavLink></button>
  </nav>
  <Routes>
            <Route path=':one' element={<DeadendOne/>}/>
            <Route path='deadtwo' element={<DeadendTwo/>}/>
            <Route path='deadthree' element={<DeadendThree/>}/>
  </Routes>
  <Outlet/>
  <body className='TestPage'>
      <h1>wow! test page</h1>
      <p>something went wrong....</p>
  </body>
  </>
    )
  }