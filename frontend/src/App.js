import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css';
import RootLayout from './Layout/RootLayout';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Sell from './Pages/Sell';
import Profile from './Pages/Profile';
import Product from './Pages/Product';
export const BASE_URL = 'http://localhost:8010';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<RootLayout/>}>
        <Route index element ={<Dashboard/>} />
        <Route path='/product/:id' element ={<Product/>} />
        <Route path='login' element ={<Login/>} />
        <Route path='register' element ={<Register/>} />
        <Route path='sell' element ={<Sell/>} />
        <Route path='profile' element={<Profile/>} />
        
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
