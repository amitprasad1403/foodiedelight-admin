import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    
    
    const [currentTime, setCurrentTime] = useState(new Date());

    const handleLogout = () => {
        localStorage.clear();
    }


    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    },[])

    return (
        <>
            <nav class="navbar col-lg-12 col-12 px-0 py-0 py-lg-4 d-flex flex-row">
                <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span class="mdi mdi-menu"></span>
                    </button>
                    <div class="navbar-brand-wrapper">
                        <a class="navbar-brand brand-logo" href="index.html"><img src="assets/images/logo-1.png" alt="logo" style={{ width: `225px`, height: `38px`, marginLeft: `-28px`,backgroundColor:`#0000002e` }} /></a>
                        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
                    </div>
                    <h4 class="font-weight-bold mb-0 d-none d-md-block mt-1 ml-4">Welcome back, Amit</h4>
                    <ul class="navbar-nav navbar-nav-right">
                        <li class="nav-item">
                            <h4 class="mb-0 font-weight-bold d-none d-xl-block">{currentTime.toLocaleString()}</h4>
                        </li> 
                        <li class="nav-item dropdown mr-2">
                        <Link to="/login" style={{color:`#ffffff`}}>
                            <h4 class="font-weight-bold mb-0 d-none d-md-block mt-1 ml-4" style={{cursor:`pointer`}} onClick={handleLogout}>Logout</h4>
                        </Link>
                        </li>
                    </ul>
                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span class="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}
