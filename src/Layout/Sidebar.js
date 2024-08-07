import Reactt, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

    const location = useLocation();
    const [role, setRole] = useState()
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item sidebar-category" >

                        <span></span>
                    </li>
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/">
                            <i className="mdi mdi-view-quilt menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item sidebar-category">
                        <p>Components</p>
                        <span></span>
                    </li>
                    <li className={`nav-item ${location.pathname === '/restaurents' || location.pathname === '/restaurent_add' || location.pathname === '/restaurent_edit' || location.pathname === '/menu' || location.pathname === '/menu_add' || location.pathname === '/menu_edit' ? 'active' : ''}`}>
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic-vendors" aria-expanded="false" aria-controls="ui-basic-vendors">
                            <i className="mdi mdi-account menu-icon"></i>
                            <span className="menu-title">Restaurents</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="ui-basic-vendors">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link to="/restaurents" className="nav-link">Restaurents List</Link></li>
                                <li className="nav-item"> <Link to="/restaurent_add" className="nav-link">Add Restaurent</Link></li>
                            </ul>
                        </div>
                    </li> 
                </ul>
            </nav>
        </>
    )
}
