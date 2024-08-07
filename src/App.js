import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import { useEffect } from 'react';
import Home from './Pages/Home'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Sidebar from './Layout/Sidebar'
import Dashboard from './Pages/Dashboard';
import Login from './Auth/Login';
import Restaurents from './Pages/Restaurents';
import RestaurentAdd from './Pages/RestaurentAdd';
import RestaurentEdit from './Pages/RestaurentEdit';
import Menu from './Pages/Menu';
import MenuAdd from './Pages/MenuAdd';
import MenuEdit from './Pages/MenuEdit';

export default function App() {
  return (
    <> 
    <Router>
      <Main />
    </Router>
    </>
  )
}

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route path='/*' element={<ProtectedLayout />} />
    </Routes>
  );
}

function ProtectedLayout() { 

  return (
    <div className="container-scroller d-flex">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Header /> 
        <Routes>
          <Route exact path='/' element={<Dashboard />} /> 
          <Route exact path='/restaurents' element={<Restaurents />} /> 
          <Route exact path='/restaurent_add' element={<RestaurentAdd />} /> 
          <Route exact path='/restaurent_edit' element={<RestaurentEdit />} /> 
          <Route exact path='/menu' element={<Menu />} /> 
          <Route exact path='/menu_add' element={<MenuAdd />} /> 
          <Route exact path='/menu_edit' element={<MenuEdit />} /> 
        </Routes>
      </div>   
      <Tooltip id="my-tooltip" />
    </div>
  );
}
